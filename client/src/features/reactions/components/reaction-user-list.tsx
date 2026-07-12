import type { ReactNode } from "react";
import { ReactionUserItem } from "./reaction-user-item";

type ReactionUser = {
  id: string;
  name: string;
};

type ReactionUserListProps = {
  users: ReactionUser[];
  emptyState?: ReactNode;
};

export function ReactionUserList({ users, emptyState }: ReactionUserListProps) {
  if (!users.length) {
    return <div>{emptyState ?? <p className="mb-0 text-muted">No reactions yet.</p>}</div>;
  }

  return (
    <div className="d-grid gap-2">
      {users.map((user) => (
        <ReactionUserItem key={user.id} user={user} />
      ))}
    </div>
  );
}
