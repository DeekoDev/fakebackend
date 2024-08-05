import { Braces, Database, GitFork, Server } from "lucide-react";

interface Props {}

export const Logo = ({}: Props) => {
  return (
    <div className="flex items-center gap-2">
      <img
        className="h-8 w-8 rounded-lg object-contain object-center"
        src="https://imagedelivery.net/0VK4YOgiY_3ex-SewiQEFw/2c55941d-3768-4a78-463f-0a70e3a48e00/public"
      />
      <h2 className="text-lg font-medium">FakeBackend</h2>
    </div>
  );
};
