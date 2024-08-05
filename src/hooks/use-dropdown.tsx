import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export const useDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    close();
  }, [pathname]);

  const open = () => {
    setIsOpen(true);
  };

  const close = () => {
    setIsOpen(false);
  };

  const toggle = () => {
    setIsOpen((prev) => !prev);
  };

  return {
    isOpen,
    setIsOpen,
    open,
    toggle,
    close,
  };
};
