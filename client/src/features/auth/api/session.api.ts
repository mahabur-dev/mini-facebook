import { apiClient } from "@/lib/api/api-client";
import type { CurrentUserResponse } from "../types/auth.types";

export async function sessionApi() {
  const user = await apiClient<CurrentUserResponse["user"]>("/auth/me");
  return { user };
}
