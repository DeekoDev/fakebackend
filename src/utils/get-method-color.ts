import {
  METHOD_COLOR,
  METHOD_COLOR_DEFAULT,
} from "@/constants/operation.constants";

export const getMethodColor = (method: string) => {
  return (
    (
      METHOD_COLOR as Record<string, { background: string; foreground: string }>
    )[method] || METHOD_COLOR_DEFAULT
  );
};
