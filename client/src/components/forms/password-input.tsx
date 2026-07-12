import type { InputHTMLAttributes } from "react";
import { Input } from "@/components/ui/input";

type PasswordInputProps = InputHTMLAttributes<HTMLInputElement>;

export function PasswordInput(props: PasswordInputProps) {
  return <Input type="password" {...props} />;
}
