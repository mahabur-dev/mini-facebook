import { Injectable } from "@nestjs/common";
import { InvalidMediaException } from "../exceptions/invalid-media.exception";

const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp"]);

@Injectable()
export class ImageUploadPolicy {
  canUpload(mimeType: string, fileSize: number, maxSizeBytes: number) {
    if (!ALLOWED_TYPES.has(mimeType)) {
      throw new InvalidMediaException("Unsupported image type");
    }

    if (fileSize <= 0 || fileSize > maxSizeBytes) {
      throw new InvalidMediaException("Image size is out of allowed range");
    }
  }
}
