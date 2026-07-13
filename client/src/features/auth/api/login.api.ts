import { apiClient } from "@/lib/api/api-client";
import type { AuthSession } from "../types/auth.types";

export async function loginApi(input: { email: string; password: string }) {
  return apiClient<AuthSession>("/auth/login", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
