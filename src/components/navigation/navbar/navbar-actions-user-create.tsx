"use client";

import { useModal } from "@/components/providers/modal-provider";
import { useSession } from "@/components/providers/session-provider";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

interface Props {}

export const NavbarActionsUserCreate = ({}: Props) => {
  const modal = useModal();
  const { session } = useSession();
  const router = useRouter();

  const handleClick = () => {

    if(!session) {
      router.push("/api/auth/signin");
      return;
    }


    modal.open("project-create");

  };

  return <Button onClick={handleClick} size="sm">Create</Button>;
};
