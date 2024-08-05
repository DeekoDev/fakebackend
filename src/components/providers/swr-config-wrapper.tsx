"use client";

import { fetcher } from "@/utils/fetcher";
import { SWRConfig } from "swr";

interface Props {
  children: React.ReactNode;
}

export const SWRConfigWrapper = ({ children }: Props) => {
  return (
    <SWRConfig
      value={{
        fetcher: fetcher,
      }}
    >
      {children}
    </SWRConfig>
  );
};
