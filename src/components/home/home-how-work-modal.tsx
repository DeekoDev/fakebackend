"use client";

import { useModal } from "../providers/modal-provider";
import { Button } from "../ui/button";
import { Modal } from "../ui/modal";

interface Props {}

export const HomeHowWorkModal = ({}: Props) => {
  const modal = useModal();

  return (
    <Modal key="home-how-work">
      <div
        style={{
          position: "relative",
          paddingBottom: "56.25%",
          height: 0,
        }}
      >
        <iframe
          src="https://www.loom.com/embed/13cd6e77bad745188dac9db1c670f4d6?sid=d732786a-6076-43b1-aa2e-f4a5f21c00bc"
          frameBorder="0"
          allowFullScreen
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        ></iframe>
      </div>
    </Modal>
  );
};
