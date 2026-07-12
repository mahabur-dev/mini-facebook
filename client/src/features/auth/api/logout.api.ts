export async function logoutApi() {
  await new Promise((resolve) => setTimeout(resolve, 60));
  return { success: true };
}
