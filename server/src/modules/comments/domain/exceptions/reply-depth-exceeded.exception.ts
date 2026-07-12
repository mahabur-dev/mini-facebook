import { BadRequestException } from "@nestjs/common";

export class ReplyDepthExceededException extends BadRequestException {
  constructor() {
    super("Replies cannot have nested replies");
  }
}
