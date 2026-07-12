import type { ReactNode } from "react";

export function PostCard({ children }: { children?: ReactNode }) {
  return <div className="_feed_inner_timeline_post_area">{children}</div>;
}
