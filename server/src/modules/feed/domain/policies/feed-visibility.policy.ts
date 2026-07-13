import { Injectable } from "@nestjs/common";
import { PostVisibility } from "../../../posts/domain/enums/post-visibility.enum";

@Injectable()
export class FeedVisibilityPolicy {
  canSeePost(viewerId: string, authorId: string, visibility: PostVisibility) {
    return visibility === PostVisibility.PUBLIC || authorId === viewerId;
  }
}
