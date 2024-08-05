"use client";
import { getHookOfContext } from "@/utils/get-hook-of-context";
import { ISODateString, Session } from "next-auth";
import { createContext, useState } from "react";
import { User } from "@prisma/client";
import { Role } from "@/interfaces/user.interfaces";

interface SessionContext {
  session: Session | null;
  overwrite: (user: User) => void;
}

const sessionContext = createContext<SessionContext>({
  session: null,
  overwrite: (user: User) => {},
});

interface Props {
  session: Session | null;
  children: React.ReactNode;
}

export const SessionProvider = ({ session: _session, children }: Props) => {
  const [session, setSession] = useState<Session | null>(_session);

  const overwrite = (user: User) => {
    setSession((prev) => {
      if (prev === null) return prev;

      return {
        ...prev,
        user: {
          id: user.id,
          role: user.role as Role,
          username: user.username || undefined,
        },
      };
    });
  };

  return (
    <sessionContext.Provider
      value={{
        session,
        overwrite,
      }}
    >
      {children}
    </sessionContext.Provider>
  );
};

export const useSession = getHookOfContext<SessionContext>(sessionContext);
