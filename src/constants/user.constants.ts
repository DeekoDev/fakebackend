import { Role } from "@/interfaces/user.interfaces";

export const USERNAME_REGEX = /^[a-zA-Z0-9_]+$/;

export const USER_ROLE: Record<Role, Role> = {
  ADMIN: "ADMIN",
  USER: "USER",
};

export const USER_DEFAULT_IMAGE =
  "https://i.pinimg.com/564x/70/be/ea/70beeaefce93a824ca8b11d7d25b7130.jpg";
