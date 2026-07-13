import type { z } from "zod";
import { loginSchema } from "../schemas/login.schema";
import { registerSchema } from "../schemas/register.schema";

export type LoginValues = z.input<typeof loginSchema>;

export type RegisterValues = z.input<typeof registerSchema>;

export type AuthUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  profileImageUrl: string | null;
  profileImageStorageKey: string | null;
  status: string;
  lastLoginAt: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt: string | null;
};

export type AuthSession = {
  user: AuthUser;
  accessToken: string;
  refreshToken: string;
};

export type CurrentUserResponse = {
  user: AuthUser;
};
