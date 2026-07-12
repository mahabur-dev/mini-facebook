import { BadRequestException } from "@nestjs/common";

export class PostEmptyException extends BadRequestException {
  constructor() {
    super("Post content or image is required");
  }
}
