import { Injectable, BadRequestException } from "@nestjs/common";

const ALLOWED_MIME_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "video/mp4", "video/webm", "video/quicktime"]);

@Injectable()
export class ImageValidationService {
  validateMimeType(mimeType: string) {
    if (!ALLOWED_MIME_TYPES.has(mimeType)) {
      throw new BadRequestException("Unsupported image type");
    }
  }
}
