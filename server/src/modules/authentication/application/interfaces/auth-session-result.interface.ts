import { SafeUser } from "../../domain/entities/user.entity";

export interface AuthSessionResult {
  user: SafeUser;
  accessToken: string;
  refreshToken: string;
}
