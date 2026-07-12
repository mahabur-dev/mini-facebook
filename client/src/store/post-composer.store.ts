"use client";

import { create } from "zustand";

type PostComposerState = {
  text: string;
  visibility: "Public" | "Private";
  setText: (value: string) => void;
  setVisibility: (value: "Public" | "Private") => void;
  reset: () => void;
};

export const usePostComposerStore = create<PostComposerState>((set) => ({
  text: "",
  visibility: "Public",
  setText: (value) => set({ text: value }),
  setVisibility: (value) => set({ visibility: value }),
  reset: () => set({ text: "", visibility: "Public" }),
}));
