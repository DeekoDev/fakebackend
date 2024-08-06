import { Logo } from "@/components/brand/logo";
import { HackatonCTA } from "@/components/home/hackaton-cta";
import { MoveRight } from "lucide-react";

interface Props {}

export const Footer = ({}: Props) => {
  return (
    <div className="bg-dark-900">
      <div className="fluid-container mx-auto flex flex-col md:flex-row gap-4 justify-between border-b py-8">
        <Logo />

        <HackatonCTA />
      </div>
      <div className="fluid-container mx-auto flex gap-3 py-8">
        <img
          className="h-10 w-10 rounded-full object-cover object-top"
          src={"https://i.pinimg.com/564x/7f/16/c4/7f16c4622b4243f54027b0aa986edf0d.jpg"}
        />

        <div>
          <p className="text-sm font-medium text-light-600">Discord</p>
          <p className="font-medium">@deekodev</p>
        </div>
      </div>
    </div>
  );
};
