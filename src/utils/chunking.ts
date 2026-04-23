// Chunking utility for splitting text into overlapping chunks
// Justify: 300 tokens (approx. 200-300 words) balances context and recall; 50-token overlap preserves context across boundaries
export function chunkText(
  text: string,
  chunkSize: number = 300,
  overlap: number = 50,
): string[] {
  const words = text.split(/\s+/);
  const chunks = [];
  for (let i = 0; i < words.length; i += chunkSize - overlap) {
    const chunk = words.slice(i, i + chunkSize).join(" ");
    if (chunk.trim().length > 0) chunks.push(chunk);
  }
  return chunks;
}
