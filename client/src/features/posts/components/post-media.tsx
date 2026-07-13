import type { ReactNode } from "react";

type PostMediaProps = {
  src?: string | null;
  alt: string;
  mimeType?: string | null;
  children?: ReactNode;
};

export function PostMedia({ src, alt, mimeType, children }: PostMediaProps) {
  if (!src) {
    return null;
  }

  const isVideo = Boolean(mimeType?.startsWith("video/"));

  return (
    <div className="_feed_inner_timeline_post_image">
      {isVideo ? (
        <video src={src} className="_post_cover_img" controls playsInline />
      ) : (
        <img src={src} alt={alt} className="_post_cover_img" />
      )}
      {children}
    </div>
  );
}
