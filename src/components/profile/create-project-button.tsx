"use client";

import { useModal } from "../providers/modal-provider";
import { Button } from "../ui/button";

interface Props {}

export const CreateProjectButton = ({}: Props) => {
  const { open } = useModal();

  const handleClickCreate = () => {
    open("project-create");
  };

  return (
    <Button className="mt-6" onClick={() => handleClickCreate()}>
      Create Project
    </Button>
  );
};
