import type { ReactNode } from "react";

type EmptyStateProps = {
  title: string;
  description?: string;
  action?: ReactNode;
};

export function EmptyState({ title, description, action }: EmptyStateProps) {
  return (
    <div className="text-center py-5">
      <h4 className="_title5 mb-2">{title}</h4>
      {description ? <p>{description}</p> : null}
      {action}
    </div>
  );
}
