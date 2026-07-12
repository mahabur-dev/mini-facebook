"use client";

import { useEffect } from "react";
import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { createQueryClient } from "@/lib/query/query-client";
import { storageKeys } from "@/constants/storage-keys";
import { useNavigationStore } from "@/store/navigation.store";

const queryClient = createQueryClient();

function ThemeBootstrap() {
  const darkMode = useNavigationStore((state) => state.darkMode);
  const isHydrated = useNavigationStore((state) => state.isHydrated);
  const setDarkMode = useNavigationStore((state) => state.setDarkMode);
  const hydrate = useNavigationStore((state) => state.hydrate);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(storageKeys.theme);
    if (storedTheme === "dark") {
      setDarkMode(true);
    } else if (storedTheme === "light") {
      setDarkMode(false);
    }
    hydrate(true);
  }, [hydrate, setDarkMode]);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    window.localStorage.setItem(storageKeys.theme, darkMode ? "dark" : "light");
  }, [darkMode, isHydrated]);

  return null;
}

export function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeBootstrap />
      {children}
    </QueryClientProvider>
  );
}
