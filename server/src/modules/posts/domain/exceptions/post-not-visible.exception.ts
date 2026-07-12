import { NotFoundException } from "@nestjs/common";

export class PostNotVisibleException extends NotFoundException {
  constructor() {
    super("Post not found");
  }
}
