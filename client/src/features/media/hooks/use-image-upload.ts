"use client";

import { useMutation } from "@tanstack/react-query";
import { uploadMedia } from "../api/upload-media.api";

export function useImageUpload() {
  return useMutation({
    mutationFn: uploadMedia,
  });
}
