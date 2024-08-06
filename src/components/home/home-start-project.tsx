"use client";

import { useRouter } from "next/navigation";
import { useModal } from "../providers/modal-provider";
import { useSession } from "../providers/session-provider";
import { Button } from "../ui/button";

interface Props {}

export const HomeStartProject = ({}: Props) => {
  const modal = useModal();
  const { session } = useSession();
  const router = useRouter();

  const handleClick = () => {
    if (!session) {
      router.push("/api/auth/signin");
      return;
    }

    modal.open("project-create");
  };

  return <Button onClick={handleClick}>Start your project</Button>;
};
