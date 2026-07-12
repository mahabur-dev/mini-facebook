import { ForbiddenException } from "@nestjs/common";

export class PostNotOwnedException extends ForbiddenException {
  constructor() {
    super("You do not own this post");
  }
}
