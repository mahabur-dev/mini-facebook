import { apiClient } from "@/lib/api/api-client";
import type { AuthUser, CurrentUserResponse } from "@/features/auth/types/auth.types";

export async function updateCurrentUserAvatar(file: File): Promise<AuthUser> {
  const formData = new FormData();
  formData.append("file", file);

  const response = await apiClient<CurrentUserResponse>("/users/me/avatar", {
    method: "PATCH",
    body: formData,
  });

  return response.user;
}
