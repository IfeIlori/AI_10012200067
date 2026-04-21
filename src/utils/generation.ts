import { KBChunk } from '../data/knowledgeBase';

export function esc(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

export function mdToHtml(t: string): string {
  return t
    .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/\((\d)\)/g, '<strong>($1)</strong>')
    .replace(/GH₵/g, '<strong>GH₵</strong>')
    .replace(/USD/g, '<strong>USD</strong>')
    .replace(/\n/g, '<br>');
}

const followUps: Record<string, string> = {
  election:  'You can also ask about <strong>regional breakdowns</strong>, <strong>parliamentary seats</strong>, or <strong>historical trends</strong>.',
  budget:    'You can also ask about other budget sectors like <strong>health</strong>, <strong>agriculture</strong>, or <strong>debt management</strong>.',
  education: 'Related: try asking about the <strong>GETFund</strong>, <strong>Free SHS</strong> programme, or <strong>TVET allocations</strong>.',
  health:    'Related: ask about <strong>Agenda 111</strong>, <strong>NHIA coverage targets</strong>, or <strong>medicine allocations</strong>.',
  acity:     'You can also ask about <strong>CS4241 topics</strong>, <strong>RAG architecture</strong>, or the <strong>exam requirements</strong>.',
  rag:       'Related: ask how <strong>chunking strategy</strong> affects retrieval, or about <strong>embedding models</strong>.',
  debt:      'Related: ask about the <strong>IMF programme conditions</strong>, <strong>DDEP</strong>, or <strong>Eurobond restructuring</strong>.',
  imf:       'Related: ask about <strong>Ghana\'s fiscal deficit target</strong> or the <strong>primary balance</strong> requirements.',
};

export function generateAnswer(query: string, chunks: KBChunk[]): string {
  if (!chunks || chunks.length === 0) {
    return `I don't have enough information about "<em>${esc(query)}</em>" in my knowledge base. Try asking about the <strong>2025 Ghana Budget</strong> (sectors, allocations, IMF, debt), or <strong>Ghana election results</strong> (2016 to 2024).`;
  }

  const top = chunks[0];
  const ql = query.toLowerCase();

  let answer = mdToHtml(top.text);

  if (chunks.length > 1) {
    const extra = chunks.slice(1)
      .filter(c => c.id !== top.id)
      .map(c => {
        const sents = c.text.split(/\.\s+/);
        return sents[0] + (sents[1] ? '. ' + sents[1] : '') + '.';
      }).join(' ');
    if (extra.trim()) {
      answer += `<br><br><em style="color:rgba(255,255,255,.65);font-size:13px;">Additionally:</em> ${mdToHtml(extra)}`;
    }
  }

  let hint = '';
  for (const [k, v] of Object.entries(followUps)) {
    if (ql.includes(k)) { hint = v; break; }
  }
  if (!hint) {
    if (top.src.includes('Election')) hint = followUps.election;
    else if (top.src.includes('Budget')) hint = followUps.budget;
  }

  if (hint) answer += `<br><br><span style="font-size:12px;color:rgba(255,255,255,.5);">&#8618; ${hint}</span>`;

  return answer;
}

export interface PromptLog {
  query: string;
  expandedQuery: string;
  chunksRetrieved: number;
  topScore: number;
  contextLength: number;
  promptTemplate: string;
}

export function buildPromptLog(query: string, chunks: KBChunk[]): PromptLog {
  const context = chunks.map((c, i) => `[Chunk ${i + 1}] ${c.cat}\n${c.text}`).join('\n\n');
  const promptTemplate = `You are ACity Assistant, a RAG-powered academic helper for Academic City University College, Ghana.

RETRIEVED CONTEXT:
${context}

USER QUERY: ${query}

INSTRUCTIONS: Answer the query using ONLY the retrieved context above. If the context does not contain enough information, say so clearly. Do not hallucinate or add information not present in the context.

ANSWER:`;

  return {
    query,
    expandedQuery: query,
    chunksRetrieved: chunks.length,
    topScore: chunks[0]?.score ?? 0,
    contextLength: context.length,
    promptTemplate,
  };
}
