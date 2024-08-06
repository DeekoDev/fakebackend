"use client";

import { useBodyLock } from "@/components/providers/body-lock-provider";
import { Button } from "@/components/ui/button";
import { Project } from "@prisma/client";
import { Menu, X } from "lucide-react";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode;
  project: Project;
}

export const DashboardSidenavMobile = ({ project, children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);
  const bodyLock = useBodyLock();
  const pathname = usePathname();

  useEffect(() => {
    closeMenu();
  }, [pathname]);

  useEffect(() => {
    if (isOpen) bodyLock.lock();
    if (!isOpen) bodyLock.unlock();
  }, [isOpen]);

  const openMenu = () => {
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="h-16 border-b lg:hidden">
        <div className="fluid-container mx-auto flex h-full items-center justify-between">
          <p className="font-semibold">{project.name}</p>
          <Button onClick={() => openMenu()} size="icon" variant="ghost">
            <Menu className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 h-full w-full bg-dark-900">
          <Button
            onClick={() => closeMenu()}
            size="icon"
            variant="ghost"
            className="absolute right-4 top-4"
          >
            <X className="h-6 w-6" />
          </Button>
          {children}
        </div>
      )}
    </>
  );
};
