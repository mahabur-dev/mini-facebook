export async function uploadMedia(file: File) {
  await new Promise((resolve) => setTimeout(resolve, 100));
  return {
    url: URL.createObjectURL(file),
    name: file.name,
  };
}
