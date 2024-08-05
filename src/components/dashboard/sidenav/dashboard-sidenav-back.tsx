"use client";

import { useRouteTrack } from "@/components/providers/route-track-provider";
import { useSession } from "@/components/providers/session-provider";
import { Button } from "@/components/ui/button";
import { Undo2 } from "lucide-react";
import { useRouter } from "next/navigation";

interface Props {}

export const DashboardSidenavBack = ({}: Props) => {
  const { tracks } = useRouteTrack();
  const { session } = useSession();
  const router = useRouter();

  const handleClick = () => {
    const lastTracks = tracks.filter((track) => {
      return !track.path.startsWith("/dashboard");
    });

    if (lastTracks.length === 0) {
      if (session?.user) {
        router.push(`/u/${session.user.username}`);
        return;
      }

      router.push("/");
      return;
    }

    router.push(lastTracks[lastTracks.length - 1]?.path || "/");
  };

  return (
    <Button onClick={handleClick} variant="ghost">
      <Undo2 className="h-4 w-4" />
      Back
    </Button>
  );
};
