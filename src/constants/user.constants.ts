import { Role } from "@/interfaces/user.interfaces";

export const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;

export const USER_ROLE: Record<Role, Role> = {
  ADMIN: "ADMIN",
  USER: "USER",
};

export const USER_DEFAULT_IMAGE =
  "https://imagedelivery.net/0VK4YOgiY_3ex-SewiQEFw/886a0098-dd1e-411b-0230-2b79f0d9ed00/public";
