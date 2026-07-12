"use client";

import { useMutation } from "@tanstack/react-query";
import { registerApi } from "../api/register.api";

export function useRegister() {
  return useMutation({
    mutationFn: registerApi,
  });
}
