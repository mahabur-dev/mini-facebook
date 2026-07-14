"use client";

import { createPortal } from "react-dom";
import { cn } from "@/lib/cn";
import { useNavigationStore } from "@/store/navigation.store";
import { ReactionUserList } from "./reaction-user-list";
import { useReactionUsers } from "../hooks/use-reaction-users";

type ReactionUsersModalProps = {
  open: boolean;
  onClose: () => void;
  targetId: string;
  targetType: "post" | "comment" | "reply";
};

export function ReactionUsersModal({ open, onClose, targetId, targetType }: ReactionUsersModalProps) {
  const reactionUsersQuery = useReactionUsers(targetId, targetType, { enabled: open });
  const darkMode = useNavigationStore((state) => state.darkMode);

  if (!open) {
    return null;
  }

  return createPortal(
    <div className={cn("_reaction_modal_overlay", darkMode && "_dark_wrapper")} role="presentation" onMouseDown={onClose}>
      <div className="_reaction_modal_card" role="dialog" aria-modal="true" aria-labelledby="reaction-users-title" onMouseDown={(event) => event.stopPropagation()}>
        <div className="_reaction_modal_header">
          <h3 id="reaction-users-title" className="_reaction_modal_title">
            People who reacted
          </h3>
          <button type="button" className="_reaction_modal_close" aria-label="Close reactions" onClick={onClose}>
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="none" viewBox="0 0 18 18">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3l12 12M15 3L3 15" />
            </svg>
          </button>
        </div>
        <div className="_reaction_modal_body">
          <ReactionUserList users={reactionUsersQuery.data ?? []} />
        </div>
      </div>
    </div>,
    document.body,
  );
}
