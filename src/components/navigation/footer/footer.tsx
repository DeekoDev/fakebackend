import { Logo } from "@/components/brand/logo";
import { MoveRight } from "lucide-react";

interface Props {}

export const Footer = ({}: Props) => {
  return (
    <div className=" bg-dark-900">
      <div className="fluid-container mx-auto flex justify-between border-b py-8">
        <Logo />

        <div className="flex w-fit items-center gap-1 rounded-full bg-green-900/30 px-4 py-1.5 text-sm font-medium text-green-400">
          Midudev/Vercel Hackathon 2024
          <MoveRight className="h-4 w-4" />
        </div>
      </div>
      <div className="fluid-container mx-auto flex gap-3 py-8">
        <img
          className="h-10 w-10 rounded-full object-cover object-top"
          src="https://cdn.discordapp.com/avatars/415680145660182529/b4b96902c17d5b19e5f0a0e7c580b8bc.png"
        />

        <div>
          <p className="text-sm text-light-600 font-medium">Discord</p>
          <p className="font-medium">@deekodev</p>
        </div>
      </div>
    </div>
  );
};
