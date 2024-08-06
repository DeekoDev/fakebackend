"use client";

import { useModal } from "../providers/modal-provider";
import { Button } from "../ui/button";

interface Props {}

export const HomeStartProject = ({}: Props) => {
  const modal = useModal();

  const handleClick = () => {
    modal.open("project-create");
  };

  return <Button onClick={handleClick}>Start your project</Button>;
};
