"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "@/constants/query-keys";
import { updateStoredUser } from "@/lib/auth/session";
import { updateCurrentUserAvatar } from "../api/update-current-user-avatar.api";

export function useUpdateCurrentUserAvatar() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateCurrentUserAvatar,
    onSuccess: (user) => {
      updateStoredUser(user);
      queryClient.setQueryData(queryKeys.auth.currentUser, { user });
      void queryClient.invalidateQueries({ queryKey: queryKeys.feed.list });
    },
  });
}
