"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/query-keys";
import { updateStoredUser } from "@/lib/auth/session";
import { updateCurrentUser } from "../api/update-current-user.api";

export function useUpdateCurrentUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCurrentUser,
    onSuccess: (user) => {
      updateStoredUser(user);
      queryClient.setQueryData(queryKeys.auth.currentUser, { user });
    },
  });
}
