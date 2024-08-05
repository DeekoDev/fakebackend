import {
  STATUS_COLOR,
  STATUS_TEXT,
  STATUS_TEXT_DEFAULT,
} from "@/constants/operation.constants";

export const getStatusInfo = (
  status: number,
): {
  text: string;
  color: {
    foreground: string;
    background: string;
  };
} => {
  const color =
    (
      STATUS_COLOR as Record<string, { background: string; foreground: string }>
    )[status.toString()[0] + "xx"] || STATUS_COLOR["2xx"];

  return {
    text:
      (STATUS_TEXT as Record<number, string>)[status] || STATUS_TEXT_DEFAULT,
    color,
  };
};
