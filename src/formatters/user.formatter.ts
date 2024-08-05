import { PublicUser } from "@/interfaces/user.interfaces";
import { User } from "@prisma/client";

export class UserFormatter {
  static public(user: User): PublicUser {
    return {
      id: user.id,
      role: user.role,
      name: user.name,
      description: user.description,
      username: user.username,
      image: user.image,
    };
  }
}
