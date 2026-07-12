import type { ReactNode } from "react";
import { Modal } from "@/components/ui/modal";

type PostComposerModalProps = {
  open: boolean;
  onClose: () => void;
  title?: string;
  children?: ReactNode;
};

export function PostComposerModal({ open, onClose, title = "Create post", children }: PostComposerModalProps) {
  return (
    <Modal open={open} title={title} onClose={onClose}>
      {children}
    </Modal>
  );
}
