import { UserStatus } from "../enums/user-status.enum";

export type UserEntity = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  passwordHash: string;
  status: UserStatus;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export type SafeUser = Omit<UserEntity, "passwordHash">;
