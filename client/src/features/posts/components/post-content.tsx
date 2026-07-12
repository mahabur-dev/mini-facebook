import type { ReactNode } from "react";

type PostContentProps = {
  text: string;
  children?: ReactNode;
};

export function PostContent({ text, children }: PostContentProps) {
  return (
    <div className="_feed_inner_timeline_post_content">
      <p>{text}</p>
      {children}
    </div>
  );
}
