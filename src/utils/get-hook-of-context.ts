import { Context, useContext } from "react";

export const getHookOfContext = <T>(context: Context<T>) => {
  return () => {
    const ctx = useContext(context);
    return ctx;
  };
};
