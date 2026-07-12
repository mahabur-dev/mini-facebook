import { SafeUser, UserEntity } from "../entities/user.entity";

export interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
}

export interface UsersRepository {
  findByEmail(email: string): Promise<UserEntity | null>;
  findById(id: string): Promise<UserEntity | null>;
  create(input: CreateUserInput): Promise<UserEntity>;
  updateLastLoginAt(id: string, lastLoginAt: Date): Promise<void>;
}

export const USERS_REPOSITORY = Symbol("USERS_REPOSITORY");
export type PublicUser = SafeUser;
