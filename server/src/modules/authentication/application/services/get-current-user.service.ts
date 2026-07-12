import { Inject, Injectable, NotFoundException } from "@nestjs/common";
import { USERS_REPOSITORY, UsersRepository } from "../../domain/repository-contracts/users.repository";
import { toSafeUser } from "../../presentation/presenters/safe-user.presenter";

@Injectable()
export class GetCurrentUserService {
  constructor(@Inject(USERS_REPOSITORY) private readonly usersRepository: UsersRepository) {}

  async execute(userId: string) {
    const user = await this.usersRepository.findById(userId);
    if (!user || user.deletedAt) {
      throw new NotFoundException("User not found");
    }

    return toSafeUser(user);
  }
}
