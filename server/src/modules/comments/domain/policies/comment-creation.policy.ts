import { Injectable } from "@nestjs/common";
import { CommentEmptyException } from "../exceptions/comment-empty.exception";

@Injectable()
export class CommentCreationPolicy {
  canCreate(content?: string | null) {
    if (!content || !content.trim()) {
      throw new CommentEmptyException();
    }
  }
}
