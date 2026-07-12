export async function updatePost(id: string, input: { text?: string; visibility?: "Public" | "Private" }) {
  await new Promise((resolve) => setTimeout(resolve, 120));
  return { id, ...input };
}
