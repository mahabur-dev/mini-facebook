import { apiClient } from "@/lib/api/api-client";
import type { AuthSession } from "../types/auth.types";

export async function registerApi(input: { firstName: string; lastName: string; email: string; password: string }) {
  return apiClient<AuthSession>("/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  });
}
