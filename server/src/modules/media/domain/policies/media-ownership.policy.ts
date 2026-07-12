import { Injectable } from "@nestjs/common";
import { MediaEntity } from "../entities/media.entity";
import { MediaNotOwnedException } from "../exceptions/media-not-owned.exception";

@Injectable()
export class MediaOwnershipPolicy {
  canManage(userId: string, media: MediaEntity | null) {
    if (!media || media.ownerId !== userId) {
      throw new MediaNotOwnedException();
    }
  }
}
