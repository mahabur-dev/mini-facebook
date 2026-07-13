"use client";

import { useMutation } from "@tanstack/react-query";
import { loginApi } from "../api/login.api";

export function useLogin() {
  return useMutation({
    mutationFn: loginApi,
  });
}
