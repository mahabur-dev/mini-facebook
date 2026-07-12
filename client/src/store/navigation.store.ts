"use client";

import { create } from "zustand";

type NavigationState = {
  darkMode: boolean;
  mobileMenuOpen: boolean;
  setDarkMode: (value: boolean) => void;
  toggleDarkMode: () => void;
  setMobileMenuOpen: (value: boolean) => void;
  toggleMobileMenu: () => void;
};

export const useNavigationStore = create<NavigationState>((set) => ({
  darkMode: false,
  mobileMenuOpen: false,
  setDarkMode: (value) => set({ darkMode: value }),
  toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),
  setMobileMenuOpen: (value) => set({ mobileMenuOpen: value }),
  toggleMobileMenu: () => set((state) => ({ mobileMenuOpen: !state.mobileMenuOpen })),
}));
