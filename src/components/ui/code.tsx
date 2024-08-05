"use client";
import React, { useRef, useEffect, useId } from "react";
import Prism from "prismjs";
import "prismjs/components/prism-json";
import { cn } from "@/utils/cn";
// import "../../../node_modules/dracula-prism/dist/css/dracula-prism.css";
// import "prismjs/themes/prism-tomorrow.css";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  code: string;
  language: string;
}

export const Code = ({ code, language, className, ...props }: Props) => {
  const ref = useRef<HTMLPreElement>(null);
  const id = useId();

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div
      className={cn(
        "Code border-t bg-dark-700 p-4 font-sans text-sm text-light-600",
        className,
      )}
      {...props}
    >
      <pre ref={ref} id={id}>
        <code
          className={`language-${language} whitespace-pre-wrap [&>.number]:text-amber-400 [&>.property]:font-medium [&>.property]:text-green-400 [&>.punctuation]:text-light-700 [&>.string]:text-light-600`}
        >
          {code}
        </code>
      </pre>
    </div>
  );
};
