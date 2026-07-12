import type { ReactNode } from "react";

type PostFooterProps = {
  children?: ReactNode;
};

export function PostFooter({ children }: PostFooterProps) {
  return <div>{children}</div>;
}
