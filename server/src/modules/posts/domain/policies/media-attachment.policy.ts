import { Injectable } from "@nestjs/common";
import { MediaEntity } from "../../../media/domain/entities/media.entity";
import { MediaNotOwnedException } from "../../../media/domain/exceptions/media-not-owned.exception";
import { InvalidMediaException } from "../../../media/domain/exceptions/invalid-media.exception";

@Injectable()
export class MediaAttachmentPolicy {
  canAttach(ownerId: string, media: MediaEntity | null) {
    if (!media || media.deletedAt) {
      throw new InvalidMediaException("Media file is not available");
    }

    if (media.ownerId !== ownerId) {
      throw new MediaNotOwnedException();
    }

    if (media.postId) {
      throw new InvalidMediaException("Media file is already attached to a post");
    }
  }
}
