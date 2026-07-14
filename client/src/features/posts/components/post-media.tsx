import type { ReactNode } from "react";

type PostMediaProps = {
  src?: string | null;
  alt: string;
  mimeType?: string | null;
  mediaKind?: "image" | "video" | "document" | "file" | null;
  name?: string | null;
  children?: ReactNode;
};

export function PostMedia({ src, alt, mimeType, mediaKind, name, children }: PostMediaProps) {
  if (!src) {
    return null;
  }

  const kind = mediaKind ?? inferMediaKind(mimeType);
  const label = name ?? getFallbackName(mimeType);

  return (
    <div className="_feed_inner_timeline_post_image">
      {kind === "video" ? (
        <video src={src} className="_post_cover_img" controls playsInline />
      ) : kind === "document" || kind === "file" ? (
        <a href={src} target="_blank" rel="noreferrer" className="_post_file_attachment">
          <span className="_post_file_attachment_icon">{mimeType === "application/pdf" ? "PDF" : "FILE"}</span>
          <span className="_post_file_attachment_text">{label}</span>
        </a>
      ) : (
        <img src={src} alt={alt} className="_post_cover_img" />
      )}
      {children}
    </div>
  );
}

function inferMediaKind(mimeType?: string | null) {
  if (!mimeType) {
    return "file";
  }

  if (mimeType.startsWith("image/")) {
    return "image";
  }

  if (mimeType.startsWith("video/")) {
    return "video";
  }

  if (mimeType === "application/pdf" || mimeType.startsWith("text/") || mimeType.includes("document") || mimeType.includes("spreadsheet")) {
    return "document";
  }

  return "file";
}

function getFallbackName(mimeType?: string | null) {
  if (mimeType === "application/pdf") {
    return "PDF attachment";
  }

  if (mimeType?.startsWith("text/")) {
    return "Text attachment";
  }

  return "File attachment";
}
