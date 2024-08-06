"use client";
import { Button } from "@/components/ui/button";
import { useModal } from "../providers/modal-provider";

interface Props {}

export const HomeHowWorkButton = ({}: Props) => {
  const modal = useModal();

  const handleClick = () => {
    modal.open("home-how-work");
  };

  return (
    <Button variant="ghost" onClick={() => handleClick()}>
      How it works
    </Button>
  );
};
