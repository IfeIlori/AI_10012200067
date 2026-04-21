import { KB, KBChunk } from '../data/knowledgeBase';

function tokenize(s: string): string[] {
  return s.toLowerCase().replace(/[^a-z0-9\s₵%]/g, ' ').split(/\s+/).filter(w => w.length > 2);
}

function expandQuery(query: string): string {
  const expansions: Record<string, string[]> = {
    'who won': ['winner', 'victory', 'elected', 'presidential'],
    'how much': ['allocation', 'billion', 'budget', 'ghc', '₵'],
    'election result': ['votes', 'presidential', 'parliamentary', 'turnout'],
    'debt': ['gdp', 'imf', 'ddep', 'fiscal', 'billion'],
    'jobs': ['employment', 'unemployment', 'labour', 'workforce'],
  };
  let expanded = query;
  for (const [phrase, synonyms] of Object.entries(expansions)) {
    if (query.toLowerCase().includes(phrase)) {
      expanded += ' ' + synonyms.join(' ');
    }
  }
  return expanded;
}

function computeSimilarity(query: string, chunk: KBChunk): number {
  const expandedQuery = expandQuery(query);
  const qt = tokenize(expandedQuery);
  const ct = new Set(tokenize(chunk.text + ' ' + chunk.kw.join(' ')));

  let match = 0;
  qt.forEach(t => { if (ct.has(t)) match++; });

  let boost = 0;
  chunk.kw.forEach(k => { if (query.toLowerCase().includes(k)) boost += 0.18; });

  // Source relevance boosts
  if (query.toLowerCase().includes('election') && chunk.src.includes('Election')) boost += 0.2;
  if ((query.toLowerCase().includes('budget') || query.toLowerCase().includes('ghc') || query.toLowerCase().includes('₵')) && chunk.src.includes('Budget')) boost += 0.2;

  // Domain-specific scoring: recency boost for 2024 data
  if (query.toLowerCase().includes('2024') && chunk.cat.includes('2024')) boost += 0.15;
  if (query.toLowerCase().includes('latest') && chunk.cat.includes('2024')) boost += 0.1;

  const iou = match / (qt.length + ct.size - match + 1);
  return Math.min(1, iou * 9 + boost);
}

function rerank(chunks: KBChunk[], query: string): KBChunk[] {
  return chunks.map(c => {
    let rerankScore = c.score ?? 0;
    // Boost exact phrase matches
    const ql = query.toLowerCase();
    const tl = c.text.toLowerCase();
    if (ql.split(' ').some(w => w.length > 4 && tl.includes(w))) {
      rerankScore += 0.05;
    }
    // Boost chunks with numeric data when query asks for amounts
    if ((ql.includes('how much') || ql.includes('amount') || ql.includes('billion')) && /GH₵|USD/.test(c.text)) {
      rerankScore += 0.08;
    }
    return { ...c, score: Math.min(1, rerankScore) };
  }).sort((a, b) => (b.score ?? 0) - (a.score ?? 0));
}

export function retrieve(query: string, k = 3): KBChunk[] {
  const scored = KB
    .map(c => ({ ...c, score: computeSimilarity(query, c) }))
    .sort((a, b) => b.score - a.score)
    .slice(0, k * 2)
    .filter(c => c.score > 0.005);

  const reranked = rerank(scored, query);
  return reranked.slice(0, k);
}
