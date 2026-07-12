export async function deletePost(id: string) {
  await new Promise((resolve) => setTimeout(resolve, 120));
  return { id, deleted: true };
}
