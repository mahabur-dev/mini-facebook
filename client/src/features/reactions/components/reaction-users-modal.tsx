import { Modal } from "@/components/ui/modal";
import { ReactionUserList } from "./reaction-user-list";
import { useReactionUsers } from "../hooks/use-reaction-users";

type ReactionUsersModalProps = {
  open: boolean;
  onClose: () => void;
  targetId: string;
  targetType: "post" | "comment" | "reply";
};

export function ReactionUsersModal({ open, onClose, targetId, targetType }: ReactionUsersModalProps) {
  const reactionUsersQuery = useReactionUsers(targetId, targetType);

  return (
    <Modal open={open} title="People who reacted" onClose={onClose}>
      <ReactionUserList users={reactionUsersQuery.data ?? []} />
    </Modal>
  );
}
