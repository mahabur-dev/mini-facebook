type ReactionUserItemProps = {
  user: {
    id: string;
    name: string;
  };
};

export function ReactionUserItem({ user }: ReactionUserItemProps) {
  return (
    <div className="d-flex align-items-center justify-content-between rounded-3 bg-light p-2">
      <span>{user.name}</span>
    </div>
  );
}
