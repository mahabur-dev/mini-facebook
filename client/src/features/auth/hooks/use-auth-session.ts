"use client";

import { useRouter } from "next/navigation";

function setDemoSession() {
  document.cookie = "buddy-session=demo-user; path=/; max-age=86400; samesite=lax";
}

export function useAuthSession() {
  const router = useRouter();

  return {
    login: async () => {
      setDemoSession();
      router.replace("/feed");
    },
    register: async () => {
      setDemoSession();
      router.replace("/feed");
    },
  };
}
