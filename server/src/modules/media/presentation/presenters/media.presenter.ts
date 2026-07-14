import { MediaEntity } from "../../domain/entities/media.entity";

export type PresentedMediaType = "image" | "video" | "document" | "file";

export function getPresentedMediaType(mimeType: string): PresentedMediaType {
  if (mimeType.startsWith("image/")) {
    return "image";
  }

  if (mimeType.startsWith("video/")) {
    return "video";
  }

  if (mimeType === "application/pdf" || mimeType.startsWith("text/") || mimeType.includes("document") || mimeType.includes("spreadsheet")) {
    return "document";
  }

  return "file";
}

export function presentMedia(media: MediaEntity) {
  return {
    ...media,
    imageUrl: media.fileUrl,
    mediaType: getPresentedMediaType(media.mimeType),
    fileSize: media.fileSize.toString(),
  };
}
