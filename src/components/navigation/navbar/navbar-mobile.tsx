"use client";
import React, { use, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { Logo } from "@/components/brand/logo";
import { NavbarNav } from "./navbar-nav";
import Link from "next/link";
import { NavbarNavProjects } from "./navbar-nav-projects";
import { NavbarNavItem } from "./navbar-nav-item";
import { usePathname } from "next/navigation";
import { useBodyLock } from "@/components/providers/body-lock-provider";

interface Props {}

export const NavbarMobile = ({}: Props) => {
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
      <Button
        onClick={() => openMenu()}
        size="icon"
        variant="ghost"
        className="md:hidden"
      >
        <Menu className="h-6 w-6" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 h-full w-full bg-dark-900">
          <div className="fluid-container mx-auto flex h-full w-full flex-col">
            <div className="flex h-16 items-center justify-between">
              <Link href="/">
                <Logo />
              </Link>
              <Button onClick={() => closeMenu()} size="icon" variant="ghost">
                <X className="h-6 w-6" />
              </Button>
            </div>

            <div className="flex flex-grow flex-col gap-2 overflow-y-auto">
              <NavbarNavProjects />
              <NavbarNavItem href="/community">Community</NavbarNavItem>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
