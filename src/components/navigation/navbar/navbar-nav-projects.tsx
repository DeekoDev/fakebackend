"use client";

import { useSession } from "@/components/providers/session-provider";
import { cn } from "@/utils/cn";
import { usePathname, useRouter } from "next/navigation";
import { useMemo } from "react";

interface Props {}

export const NavbarNavProjects = ({}: Props) => {
  const { session } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  const isActive = useMemo(() => {
    if (!session?.user) return false;

    return pathname === `/u/${session?.user.username}`;
  }, [session, pathname]);

  const handleClick = () => {
    if (!session?.user) {
      router.push("/api/auth/signin");
      return;
    }

    router.push(`/u/${session?.user.username}`);
  };

  return (
    <button
      onClick={() => handleClick()}
      className={cn(isActive ? "text-light-500" : "text-light-600")}
    >
      Projects
    </button>
  );
};
