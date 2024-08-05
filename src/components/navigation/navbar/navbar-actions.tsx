import { NavbarActionsUser } from "./navbar-actions-user";
import { NavbarActionsStarted } from "./navbar-actions-started";
import { getServerAuthSession } from "@/server/auth";

interface Props {}

export const NavbarActions = async ({}: Props) => {
  const session = await getServerAuthSession();

  if (session === null) {
    return <NavbarActionsStarted />;
  }

  return <NavbarActionsUser />;
};
