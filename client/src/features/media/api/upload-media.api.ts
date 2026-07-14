import { apiClient } from "@/lib/api/api-client";

export type UploadedMedia = {
  id: string;
  fileUrl: string;
  imageUrl?: string;
  mimeType: string;
  mediaType: "image" | "video" | "document" | "file";
  fileSize: string;
};

export async function uploadMedia(file: File): Promise<UploadedMedia> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient<{ media: UploadedMedia }>("/media", {
    method: "POST",
    body: formData,
  });

  return response.media;
}
