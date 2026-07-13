import { apiClient } from "@/lib/api/api-client";

export async function logoutApi() {
  return apiClient<{ success: boolean }>("/auth/logout", {
    method: "DELETE",
    body: JSON.stringify({}),
  });
}
