import type { ReactNode } from "react";
import { ReactionUserItem } from "./reaction-user-item";
import type { Reaction } from "../types/reaction.types";

type ReactionUserListProps = {
  users: Reaction[];
  emptyState?: ReactNode;
};

export function ReactionUserList({ users, emptyState }: ReactionUserListProps) {
  if (!users.length) {
    return <div>{emptyState ?? <p className="_reaction_modal_empty">No reactions yet.</p>}</div>;
  }

  return (
    <div className="_reaction_user_list">
      {users.map((user) => (
        <ReactionUserItem key={user.id} user={user} />
      ))}
    </div>
  );
}
