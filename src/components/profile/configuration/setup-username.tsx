"use client";

import { useModal } from "@/components/providers/modal-provider";
import { useSession } from "@/components/providers/session-provider";
import { Session } from "next-auth";
import { useEffect } from "react";

interface Props {
  session: Session | null;
}

export const SetupUsername = ({ session }: Props) => {
  const { open, isOpen, lock } = useModal();

  useEffect(() => {
    const main = () => {
      if (!session) return;

      // show modal
      if (session.user?.username) return;

      open("setup-username");
      lock();
    };

    main();
  }, []);

  return null;
};
