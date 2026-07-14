import { Injectable } from "@nestjs/common";
import { ALLOWED_MEDIA_MIME_TYPES } from "../../../../infrastructure/storage/media-validation.service";
import { InvalidMediaException } from "../exceptions/invalid-media.exception";

@Injectable()
export class MediaUploadPolicy {
  canUpload(mimeType: string, fileSize: number, maxSizeBytes: number) {
    if (!ALLOWED_MEDIA_MIME_TYPES.has(mimeType)) {
      throw new InvalidMediaException("Unsupported media type");
    }

    if (fileSize <= 0 || fileSize > maxSizeBytes) {
      throw new InvalidMediaException("Media size is out of allowed range");
    }
  }
}
