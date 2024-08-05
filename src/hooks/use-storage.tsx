"use client";
import { useState, useEffect } from "react";

type StorageType = "local" | "session";

export const useStorage = (
  key: string,
  type: StorageType,
  defaultValue?: string,
): [string | null, (value: string) => void] => {
  const [_value, setValue] = useState<string | null>(defaultValue || null);

  useEffect(() => {
    const storage = type === "local" ? localStorage : sessionStorage;
    const value = storage.getItem(key);
    setValue(value ? JSON.parse(value) : null);
  }, []);

  const set = (value: string) => {
    setValue(value);
    const storage = type === "local" ? localStorage : sessionStorage;
    storage.setItem(key, JSON.stringify(value));
  };

  return [_value, set];
};
