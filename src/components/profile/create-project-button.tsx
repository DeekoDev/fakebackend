"use client";

import { useRouter } from "next/navigation";
import { useModal } from "../providers/modal-provider";
import { useSession } from "../providers/session-provider";
import { Button } from "../ui/button";

interface Props {}

export const CreateProjectButton = ({}: Props) => {
  const { open } = useModal();
  const { session } = useSession();
  const router = useRouter();

  const handleClickCreate = () => {
    if (!session) {
      router.push("/api/auth/signin");
      return;
    }

    open("project-create");
  };

  return (
    <Button className="mt-6" onClick={() => handleClickCreate()}>
      Create Project
    </Button>
  );
};
