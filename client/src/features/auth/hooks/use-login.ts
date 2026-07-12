"use client";

import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../api/login.api";

export function useLogin() {
  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) => loginApi(email, password),
  });
}
