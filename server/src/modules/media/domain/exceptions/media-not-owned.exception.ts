import { ForbiddenException } from "@nestjs/common";

export class MediaNotOwnedException extends ForbiddenException {
  constructor() {
    super("You do not own this media");
  }
}
