import { User } from "@prisma/client";

export type Role = "USER" | "ADMIN";

export interface PublicUser
  extends Pick<
    User,
    "id" | "role" | "name" | "description" | "username" | "image"
  > {}
