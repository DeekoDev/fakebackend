import { USERNAME_REGEX } from "@/constants/user.constants";
import z from "zod";

export const usernameSchema = z
  .string()
  .min(3)
  .max(32)
  .regex(USERNAME_REGEX);

export const updateUsernameSchema = z.object({
  username: usernameSchema,
});
