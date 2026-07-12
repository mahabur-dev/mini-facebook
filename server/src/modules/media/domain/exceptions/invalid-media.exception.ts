import { BadRequestException } from "@nestjs/common";

export class InvalidMediaException extends BadRequestException {
  constructor(message = "Invalid media file") {
    super(message);
  }
}
