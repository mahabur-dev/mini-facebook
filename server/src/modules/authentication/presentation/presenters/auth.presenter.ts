import { SafeUser } from "../../domain/entities/user.entity";

export type AuthPresenter = {
  user: SafeUser;
  accessToken: string;
};
