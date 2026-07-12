"use client";

import { create } from "zustand";

type NavigationState = {
  darkMode: boolean;
  mobileMenuOpen: boolean;
  isHydrated: boolean;
  setDarkMode: (value: boolean) => void;
  toggleDarkMode: () => void;
  setMobileMenuOpen: (value: boolean) => void;
  toggleMobileMenu: () => void;
  hydrate: (value: boolean) => void;
};

export const useNavigationStore = create<NavigationState>((set) => ({
  darkMode: false,
  mobileMenuOpen: false,
  isHydrated: false,
  setDarkMode: (value) => set({ darkMode: value }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setMobileMenuOpen: (value) => set({ mobileMenuOpen: value }),
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
  hydrate: (value) => set({ isHydrated: value }),
}));
