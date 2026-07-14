"use client";

import { useRouter } from "next/navigation";
import { loginApi } from "../api/login.api";
import { logoutApi } from "../api/logout.api";
import { registerApi } from "../api/register.api";
import { clearClientSession, setClientSession } from "@/lib/auth/session";
import { routes } from "@/constants/routes";
import type { LoginValues, RegisterValues } from "../types/auth.types";

export function useAuthSession() {
  const router = useRouter();

  return {
    login: async (input: LoginValues) => {
      const session = await loginApi({ email: input.email, password: input.password });
      setClientSession(session.accessToken, session.user);
      router.replace(routes.feed);
    },
    register: async (input: RegisterValues) => {
      await registerApi({
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
        password: input.password,
      });
      clearClientSession();
      router.replace(routes.login);
    },
    logout: async () => {
      try {
        await logoutApi();
      } finally {
        clearClientSession();
        router.replace(routes.login);
      }
    },
  };
}
