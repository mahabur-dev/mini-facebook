import type { z } from "zod";
import { loginSchema } from "../schemas/login.schema";
import { registerSchema } from "../schemas/register.schema";

export type LoginValues = z.input<typeof loginSchema>;

export type RegisterValues = z.input<typeof registerSchema>;
