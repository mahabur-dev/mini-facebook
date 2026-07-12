import type { ReactNode } from "react";

type PostMediaProps = {
  src: string;
  alt: string;
  children?: ReactNode;
};

export function PostMedia({ src, alt, children }: PostMediaProps) {
  return (
    <div className="_feed_inner_timeline_post_image">
      <img src={src} alt={alt} className="_post_cover_img" />
      {children}
    </div>
  );
}
