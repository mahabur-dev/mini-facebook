import { Injectable } from "@nestjs/common";
import { InvalidCredentialsException } from "../exceptions/invalid-credentials.exception";
import { UserEntity } from "../entities/user.entity";
import { UserStatus } from "../enums/user-status.enum";

@Injectable()
export class LoginPolicy {
  canLogin(user: UserEntity | null, passwordMatches: boolean) {
    if (!user || user.deletedAt || user.status !== UserStatus.ACTIVE || !passwordMatches) {
      throw new InvalidCredentialsException();
    }
  }
}
