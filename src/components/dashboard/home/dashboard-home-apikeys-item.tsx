"use client";

import React, { useEffect, useState } from "react";
import { ApiKey } from "@prisma/client";
import { Check, Copy, Eye, EyeOff, Trash } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Props extends ApiKey {}

export const DashboardHomeApiKeysItem = ({ id }: Props) => {
  const [hidden, setHidden] = useState<boolean>(true);
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    if (!isCopied) return;

    const timer = setTimeout(() => {
      setIsCopied(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [isCopied]);

  const handleCopy = () => {
    navigator.clipboard.writeText(id);
    setIsCopied(true);
  };

  const toggleHidden = () => setHidden((prev) => !prev);

  return (
    <div className="flex items-center justify-between border-b py-2">
      <p>{hidden ? `${id.slice(0, 4)}...${id.slice(-4)}` : id}</p>
      <div className="flex items-center gap-2">
        <Button onClick={() => toggleHidden()} size="icon-sm" variant="ghost">
          {hidden ? (
            <Eye className="h-4 w-4" />
          ) : (
            <EyeOff className="h-4 w-4 text-green-400" />
          )}
        </Button>
        <Button onClick={() => handleCopy()} size="icon-sm" variant="ghost">
          {isCopied ? (
            <Check className="h-4 w-4 text-green-400" />
          ) : (
            <Copy className="h-4 w-4" />
          )}
        </Button>
      </div>
    </div>
  );
};
