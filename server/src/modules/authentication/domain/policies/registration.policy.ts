import { Injectable } from "@nestjs/common";
import { UserAlreadyExistsException } from "../exceptions/user-already-exists.exception";
import { UserEntity } from "../entities/user.entity";

@Injectable()
export class RegistrationPolicy {
  canRegister(existingUser: UserEntity | null) {
    if (existingUser) {
      throw new UserAlreadyExistsException();
    }
  }
}
