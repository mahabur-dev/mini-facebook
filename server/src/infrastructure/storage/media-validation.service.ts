import { BadRequestException, Injectable } from "@nestjs/common";

export const ALLOWED_MEDIA_MIME_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
  "video/mp4",
  "video/webm",
  "video/quicktime",
  "application/pdf",
  "text/plain",
  "text/csv",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/vnd.ms-excel",
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
]);

@Injectable()
export class MediaValidationService {
  validateMimeType(mimeType: string) {
    if (!ALLOWED_MEDIA_MIME_TYPES.has(mimeType)) {
      throw new BadRequestException("Unsupported media type");
    }
  }
}
