import { ConflictException } from "@nestjs/common";

export class UserAlreadyExistsException extends ConflictException {
  constructor() {
    super("A user with this email already exists");
  }
}
