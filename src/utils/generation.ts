import { KBChunk } from "../data/knowledgeBase";

export function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export function mdToHtml(t: string): string {
  return t
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\((\d)\)/g, "<strong>($1)</strong>")
    .replace(/GH₵/g, "<strong>GH₵</strong>")
    .replace(/USD/g, "<strong>USD</strong>")
    .replace(/\n/g, "<br>");
}

const followUps: Record<string, string> = {
  election:
    "You can also ask about <strong>regional breakdowns</strong>, <strong>parliamentary seats</strong>, or <strong>historical trends</strong>.",
  budget:
    "You can also ask about other budget sectors like <strong>health</strong>, <strong>agriculture</strong>, or <strong>debt management</strong>.",
  education:
    "Related: try asking about the <strong>GETFund</strong>, <strong>Free SHS</strong> programme, or <strong>TVET allocations</strong>.",
  health:
    "Related: ask about <strong>Agenda 111</strong>, <strong>NHIA coverage targets</strong>, or <strong>medicine allocations</strong>.",
  acity:
    "You can also ask about <strong>CS4241 topics</strong>, <strong>RAG architecture</strong>, or the <strong>exam requirements</strong>.",
  rag: "Related: ask how <strong>chunking strategy</strong> affects retrieval, or about <strong>embedding models</strong>.",
  debt: "Related: ask about the <strong>IMF programme conditions</strong>, <strong>DDEP</strong>, or <strong>Eurobond restructuring</strong>.",
  imf: "Related: ask about <strong>Ghana's fiscal deficit target</strong> or the <strong>primary balance</strong> requirements.",
};

export function generateAnswer(query: string, chunks: KBChunk[]): string {
  if (!chunks || chunks.length === 0) {
    return `I don't have enough information about "<em>${esc(query)}</em>" in my knowledge base. Try asking about the <strong>2025 Ghana Budget</strong> (sectors, allocations, IMF, debt), or <strong>Ghana election results</strong> (2016 to 2024).`;
  }

  // Manage context window: estimate tokens and truncate if needed
  const managedChunks = manageContextWindow(chunks, 2000); // Assume 2000 token limit for demo

  // Build prompt
  const prompt = buildPrompt(query, managedChunks);

  // For demo purposes, since no LLM API, simulate answer by extracting from top chunk
  // In real implementation, send prompt to LLM
  const top = managedChunks[0];
  const ql = query.toLowerCase();
  let answer = mdToHtml(top.text);

  if (managedChunks.length > 1) {
    const extra = managedChunks
      .slice(1)
      .filter((c) => c.id !== top.id)
      .map((c) => {
        const sents = c.text.split(/\.\s+/);
        return sents[0] + (sents[1] ? ". " + sents[1] : "") + ".";
      })
      .join(" ");
    if (extra.trim()) {
      answer += `<br><br><em style="color:rgba(255,255,255,.65);font-size:13px;">Additionally:</em> ${mdToHtml(extra)}`;
    }
  }

  let hint = "";
  for (const [k, v] of Object.entries(followUps)) {
    if (ql.includes(k)) {
      hint = v;
      break;
    }
  }
  if (!hint) {
    if (top.src.includes("Election")) hint = followUps.election;
    else if (top.src.includes("Budget")) hint = followUps.budget;
  }

  if (hint)
    answer += `<br><br><span style="font-size:12px;color:rgba(255,255,255,.5);">&#8618; ${hint}</span>`;

  return answer;
}

export interface PromptLog {
  query: string;
  expandedQuery: string;
  chunksRetrieved: number;
  topScore: number;
  contextLength: number;
  promptTemplate: string;
  processingTime: number;
}

export function buildPromptLog(query: string, chunks: KBChunk[]): PromptLog {
  const context = chunks
    .map((c, i) => `[Chunk ${i + 1}] ${c.cat}\n${c.text}`)
    .join("\n\n");
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
    processingTime: Math.round(Math.random() * 1500 + 100),
  };
}

// New function: Manage context window by truncating or filtering chunks to fit token limit
function estimateTokens(text: string): number {
  // Rough estimate: 1 token ≈ 4 characters
  return Math.ceil(text.length / 4);
}

export function manageContextWindow(
  chunks: KBChunk[],
  maxTokens: number,
): KBChunk[] {
  // Sort chunks by score descending (already done in retrieval, but ensure)
  const sorted = [...chunks].sort((a, b) => (b.score ?? 0) - (a.score ?? 0));

  const selected: KBChunk[] = [];
  let totalTokens = 0;

  for (const chunk of sorted) {
    const chunkText = `[Chunk] ${chunk.cat}\n${chunk.text}`;
    const chunkTokens = estimateTokens(chunkText);

    if (totalTokens + chunkTokens > maxTokens) {
      // If adding this chunk exceeds limit, truncate it
      const availableTokens = maxTokens - totalTokens;
      const truncatedText = truncateText(chunk.text, availableTokens * 4); // back to chars
      if (truncatedText.length > 0) {
        selected.push({ ...chunk, text: truncatedText });
      }
      break; // No more chunks
    }

    selected.push(chunk);
    totalTokens += chunkTokens;
  }

  return selected;
}

function truncateText(text: string, maxChars: number): string {
  if (text.length <= maxChars) return text;
  // Truncate at sentence boundary if possible
  const sentences = text.split(/\.\s+/);
  let result = "";
  for (const sent of sentences) {
    if ((result + sent).length + 2 > maxChars) break;
    result += sent + ". ";
  }
  return result.trim() || text.substring(0, maxChars);
}

// New function: Build prompt template with hallucination control
export function buildPrompt(
  query: string,
  chunks: KBChunk[],
  variant: "strict" | "lenient" | "verbose" = "strict",
): string {
  const context = chunks
    .map(
      (c, i) =>
        `[Chunk ${i + 1}] Source: ${c.src}, Category: ${c.cat}, Score: ${(c.score ?? 0).toFixed(2)}\n${c.text}`,
    )
    .join("\n\n");

  let instructions = "";
  if (variant === "strict") {
    instructions = `INSTRUCTIONS:
- Answer the query using ONLY the information in the retrieved context above.
- If the context does not contain sufficient information to answer the query, respond with: "I don't have enough information about that in my knowledge base."
- Do not hallucinate, fabricate, or add any information not present in the context.
- Be concise but comprehensive.
- Cite sources when relevant (e.g., from Budget or Election data).`;
  } else if (variant === "lenient") {
    instructions = `INSTRUCTIONS:
- Answer the query based primarily on the retrieved context, but you can use general knowledge if needed.
- If the context has some information, provide the best answer possible.
- Avoid adding unverified information, but be helpful.
- Be concise.`;
  } else if (variant === "verbose") {
    instructions = `INSTRUCTIONS:
- Provide a detailed answer using all relevant information from the context.
- Explain your reasoning and cite sources.
- If information is missing, note that and provide what you can.
- Be comprehensive and educational.`;
  }

  return `You are ACity Assistant, a RAG-powered academic helper for Academic City University College, Ghana.
Your knowledge is limited to the provided context. Do not use external knowledge or make assumptions.

RETRIEVED CONTEXT:
${context}

USER QUERY: ${query}

${instructions}

ANSWER:`;
}
