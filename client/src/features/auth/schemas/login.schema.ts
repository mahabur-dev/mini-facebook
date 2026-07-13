import { z } from "zod";
import { validation } from "@/constants/validation";

export const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(1, "Password is required").min(validation.passwordMinLength, `Password must be at least ${validation.passwordMinLength} characters`),
  rememberMe: z.boolean().default(false),
});
