import { Injectable } from "@nestjs/common";
import { PostEmptyException } from "../exceptions/post-empty.exception";
import { PostVisibility } from "../enums/post-visibility.enum";

@Injectable()
export class PostCreationPolicy {
  canCreate(input: { content?: string | null; mediaId?: string | null; visibility: PostVisibility }) {
    const trimmedContent = input.content?.trim();

    if (!trimmedContent && !input.mediaId) {
      throw new PostEmptyException();
    }

    if (input.visibility !== PostVisibility.PUBLIC && input.visibility !== PostVisibility.PRIVATE) {
      throw new PostEmptyException();
    }
  }
}
