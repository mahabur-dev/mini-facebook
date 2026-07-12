export const storageConfig = () => ({
  cloudName: process.env.CLOUDINARY_CLOUD_NAME ?? "",
  apiKey: process.env.CLOUDINARY_API_KEY ?? "",
  apiSecret: process.env.CLOUDINARY_API_SECRET ?? "",
  folder: process.env.CLOUDINARY_FOLDER ?? "mini-facebook",
  maxImageSizeBytes: Number(process.env.MAX_IMAGE_SIZE_BYTES ?? 5 * 1024 * 1024),
});
