import { UnauthorizedException } from "@nestjs/common";

export class SessionNotValidException extends UnauthorizedException {
  constructor() {
    super("Session is not valid");
  }
}
