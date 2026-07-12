export async function deleteComment(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 80));
  return { id, deleted: true };
}
