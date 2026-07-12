"use client";

import { create } from "zustand";

type ModalState = {
  notificationsOpen: boolean;
  profileMenuOpen: boolean;
  timelineMenuOpen: boolean;
  toggleNotifications: () => void;
  toggleProfileMenu: () => void;
  toggleTimelineMenu: () => void;
  closeAll: () => void;
};

export const useModalStore = create<ModalState>((set) => ({
  notificationsOpen: false,
  profileMenuOpen: false,
  timelineMenuOpen: false,
  toggleNotifications: () =>
    set((state) => ({
      notificationsOpen: !state.notificationsOpen,
      profileMenuOpen: false,
      timelineMenuOpen: false,
    })),
  toggleProfileMenu: () =>
    set((state) => ({
      profileMenuOpen: !state.profileMenuOpen,
      notificationsOpen: false,
      timelineMenuOpen: false,
    })),
  toggleTimelineMenu: () =>
    set((state) => ({
      timelineMenuOpen: !state.timelineMenuOpen,
      notificationsOpen: false,
      profileMenuOpen: false,
    })),
  closeAll: () =>
    set({
      notificationsOpen: false,
      profileMenuOpen: false,
      timelineMenuOpen: false,
    }),
}));
