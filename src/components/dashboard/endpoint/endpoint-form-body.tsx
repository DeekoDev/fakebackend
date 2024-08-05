"use client";

import { Editor } from "@/components/ui/editor";
import { Skeleton } from "@/components/ui/skeleton";
import { Endpoint } from "@prisma/client";

interface Props {
  value: string;
  handleChange: (value: string) => void;
  isLoading?: boolean;
}

export const EndpointFormBody = ({ value, handleChange, isLoading }: Props) => {
  if (isLoading) {
    return <Skeleton className="mt-3 h-[150px] w-full" />;
  }

  return (
    <Editor
      className="mt-3"
      height={150}
      editorProps={{
        defaultLanguage: "json",
        value: value,
        onChange: (e) => handleChange(e || ""),
        options: {
          minimap: {
            enabled: false,
          },
        },
      }}
    />
  );
};
