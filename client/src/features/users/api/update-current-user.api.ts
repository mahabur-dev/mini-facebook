import { apiClient } from "@/lib/api/api-client";
import type { AuthUser, CurrentUserResponse } from "@/features/auth/types/auth.types";

export type UpdateCurrentUserInput = {
  firstName: string;
  lastName: string;
};

export async function updateCurrentUser(input: UpdateCurrentUserInput): Promise<AuthUser> {
  const response = await apiClient<CurrentUserResponse>("/users/me", {
    method: "PATCH",
    body: JSON.stringify({
      firstName: input.firstName,
      lastName: input.lastName,
    }),
  });

  return response.user;
}
