import { Sparkle } from "lucide-react";
import { NavbarActionsUserProfile } from "./navbar-actions-user-profile";
import { Button } from "@/components/ui/button";
import { NavbarActionsUserCreate } from "./navbar-actions-user-create";

interface Props {}

export const NavbarActionsUser = ({}: Props) => {
  return (
    <div className="flex items-center gap-4">
      <NavbarActionsUserCreate />

      {/* todo: dropdown */}
      <NavbarActionsUserProfile />
    </div>
  );
};
