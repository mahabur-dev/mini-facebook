import { apiClient } from "@/lib/api/api-client";

export type UploadedMedia = {
  id: string;
  imageUrl: string;
  mimeType: string;
};

export async function uploadMedia(file: File): Promise<UploadedMedia> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient<{ media: UploadedMedia }>("/media/images", {
    method: "POST",
    body: formData,
  });

  return response.media;
}
