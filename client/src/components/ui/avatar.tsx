import type { ImgHTMLAttributes } from "react";

type AvatarProps = ImgHTMLAttributes<HTMLImageElement>;

export function Avatar(props: AvatarProps) {
  return <img {...props} />;
}
