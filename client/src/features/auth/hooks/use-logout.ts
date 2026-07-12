"use client";

import { useMutation } from "@tanstack/react-query";
import { logoutApi } from "../api/logout.api";

export function useLogout() {
  return useMutation({
    mutationFn: logoutApi,
  });
}
