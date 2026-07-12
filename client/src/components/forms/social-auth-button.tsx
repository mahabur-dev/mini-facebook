import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";

type SocialAuthButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  iconSrc: string;
  text: string;
  className?: string;
  children?: ReactNode;
};

export function SocialAuthButton({ iconSrc, text, className, children, type = "button", ...props }: SocialAuthButtonProps) {
  return (
    <button type={type} className={cn(className)} {...props}>
      <img src={iconSrc} alt="" className="_google_img" />
      <span>{text}</span>
      {children}
    </button>
  );
}
