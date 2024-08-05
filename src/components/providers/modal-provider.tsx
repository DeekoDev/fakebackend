"use client";

import { createContext, useEffect, useState, useMemo } from "react";
import { Overlay } from "../ui/overlay";
import { useBodyLock } from "./body-lock-provider";
import { getHookOfContext } from "@/utils/get-hook-of-context";
import { SetupUsernameModal } from "../profile/configuration/setup-username-modal";
import { ProjectCreateModal } from "../project/create/project-create-modal";
import { EndpointCreateModal } from "../dashboard/endpoint/endpoint-create-modal";
import { EndpointDefinitionModal } from "../dashboard/endpoint/endpoint-definition-modal";

const modals = {
  "project-create": <ProjectCreateModal />,
  "setup-username": <SetupUsernameModal />,
  "endpoint-create": <EndpointCreateModal />,
  "endpoint-definition": <EndpointDefinitionModal />,
};

export type ModalKey = keyof typeof modals;

type ModalPayload = Record<string, unknown> | null | undefined;

interface ModalContext {
  payload: ModalPayload;
  isOpen: boolean;
  open: (key: ModalKey, payload?: ModalPayload) => void;
  close: (options?: { force?: boolean }) => void;
  isLocked: boolean;
  lock: () => void;
  unlock: () => void;
}

const modalContext = createContext<ModalContext>({
  payload: null,
  isOpen: false,
  open: () => {},
  close: () => {},
  isLocked: false,
  lock: () => {},
  unlock: () => {},
});

interface Props {
  children: React.ReactNode;
}

export const ModalProvider = ({ children }: Props) => {
  const bodyLock = useBodyLock();
  const [modalKey, setModalKey] = useState<ModalKey | null>(null);
  const [isLocked, setIsLocked] = useState(false);
  const [payload, setPayload] = useState<ModalPayload>(null);
  const isOpen = useMemo(() => modalKey !== null, [modalKey]);

  // lock body
  useEffect(() => {
    if (isOpen) {
      bodyLock.lock();
    } else {
      bodyLock.unlock();
    }
  }, [modalKey]);

  const open = (key: ModalKey, payload?: ModalPayload) => {
    if (isLocked) return;

    setPayload(payload);
    setModalKey(key);
  };

  const close = (options?: { force?: boolean }) => {
    if (options?.force) {
      setIsLocked(false);
      setModalKey(null);
      setPayload(null);
      return;
    }

    if (isLocked) return;
    setPayload(null);
    setModalKey(null);
  };

  const lock = () => {
    setIsLocked(true);
  };
  const unlock = () => {
    setIsLocked(false);
  };

  return (
    <modalContext.Provider
      value={{
        payload,
        isOpen,
        open,
        close,
        isLocked,
        lock,
        unlock,
      }}
    >
      {isOpen && (
        <Overlay
          variant="zinc"
          onClose={() => {
            close();
          }}
          className="flex items-center justify-center"
        >
          {modals[modalKey! as ModalKey]}
        </Overlay>
      )}
      {children}
    </modalContext.Provider>
  );
};

export const useModal = getHookOfContext<ModalContext>(modalContext);
