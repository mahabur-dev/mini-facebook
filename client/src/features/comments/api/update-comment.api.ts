export async function updateComment(id: string, content: string) {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return { id, content };
}
