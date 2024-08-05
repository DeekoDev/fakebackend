import React, { useRef, useState } from "react";
import {
  Editor as CodeEditor,
  EditorProps,
  OnMount,
} from "@monaco-editor/react";

import { editor as monacoEditor } from "monaco-editor";
import { cn } from "@/utils/cn";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  editorProps?: Omit<EditorProps, "height">;
  height?: number;
}

export const Editor = ({ height, editorProps, className, ...props }: Props) => {
  const editorRef = useRef<monacoEditor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  return (
    <div
      style={{
        height: `${height}px`,
      }}
      className={cn("overflow-hidden rounded-lg border", className)}
      {...props}
    >
      <CodeEditor
        height={height}
        theme="vs-dark"
        {...editorProps}
        onMount={handleEditorDidMount}
      />
    </div>
  );
};
