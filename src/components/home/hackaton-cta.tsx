import { MoveRight } from "lucide-react";

interface Props {}

export const HackatonCTA = ({}: Props) => {
  return (
    <a
      href="https://github.com/midudev/hackaton-vercel-2024"
      target="_blank"
      className="flex w-fit items-center gap-1 rounded-full bg-green-900/30 px-4 py-1.5 text-sm font-medium text-green-400 hover:underline"
    >
      Midudev/Vercel Hackathon 2024
      <MoveRight className="h-4 w-4" />
    </a>
  );
};
