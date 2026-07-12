import { SafeUser } from "../../domain/entities/user.entity";
import { UserEntity } from "../../domain/entities/user.entity";

export function toSafeUser(user: UserEntity): SafeUser {
  const { passwordHash, ...safeUser } = user;
  return safeUser;
}
