import { BadRequestException } from "@nestjs/common";

export class CommentEmptyException extends BadRequestException {
  constructor() {
    super("Comment content is required");
  }
}
