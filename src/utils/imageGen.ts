// Image generation utility (mock, replace with real API as needed)
export async function generateImage(prompt: string): Promise<string> {
  // Replace with real API call to OpenAI, Stability, etc.
  // For now, returns a placeholder image
  return `https://placehold.co/512x512?text=${encodeURIComponent(prompt)}`;
}
