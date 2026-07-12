import { Avatar } from "@/components/ui/avatar";

type UserAvatarProps = {
  src: string;
  alt: string;
  name: string;
  className?: string;
};

export function UserAvatar({ src, alt, name, className }: UserAvatarProps) {
  return <Avatar src={src} alt={alt || name} className={className} />;
}
