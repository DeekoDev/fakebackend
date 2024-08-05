"use client";
import { getHookOfContext } from "@/utils/get-hook-of-context";
import { createContext, useEffect, useLayoutEffect, useState } from "react";

interface BodyLockContext {
  isLocked: boolean;
  paddingRight: `${number}px`;
  lock: () => void;
  unlock: () => void;
}

export const bodyLockContext = createContext<BodyLockContext>({
  isLocked: false,
  paddingRight: "0px",
  lock: () => {},
  unlock: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const BodyLockProvider = ({ children }: Props) => {
  const [isLocked, setIsLocked] = useState(false);
  const [paddingRight, setPaddingRight] = useState<`${number}px`>("0px");

  useEffect(() => {
    if (isLocked) {
      document.body.classList.add("no-scroll");
    } else {
      document.body.classList.remove("no-scroll");
    }
  }, [isLocked]);

  useLayoutEffect(() => {
    if (isLocked) {
      const pr = window.innerWidth - document.body.clientWidth;
      document.body.style.paddingRight = `${pr}px`;
      setPaddingRight(`${pr}px`);
    } else {
      document.body.style.paddingRight = `${0}px`;
      setPaddingRight("0px");
    }
  }, [isLocked]);

  const lock = () => {
    setIsLocked(true);
  };

  const unlock = () => {
    setIsLocked(false);
  };

  return (
    <bodyLockContext.Provider
      value={{
        isLocked,
        paddingRight,
        lock,
        unlock,
      }}>
      {children}
    </bodyLockContext.Provider>
  );
};

export const useBodyLock = getHookOfContext<BodyLockContext>(bodyLockContext);
