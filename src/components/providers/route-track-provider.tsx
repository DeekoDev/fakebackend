"use client";

import { createContext, useEffect, useMemo, useState } from "react";
import { getHookOfContext } from "@/utils/get-hook-of-context";
import { usePathname } from "next/navigation";

interface Track {
  path: string;
}

interface RouteTrackContext {
  tracks: Track[];
  canBack: boolean;
  getPreviousTrack: (skip?: number) => Track | undefined;
}

export const routeTrackContext = createContext<RouteTrackContext>({
  tracks: [],
  canBack: false,
  getPreviousTrack: () => undefined,
});

interface Props {
  children: React.ReactNode;
}

const TRACK_LIMIT = 30;

export const RouteTrackProvider = ({ children }: Props) => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const canBack = useMemo(() => {
    return tracks.length > 1;
  }, [tracks]);

  const pathname = usePathname();

  useEffect(() => {
    addTrack({
      path: pathname,
    });
  }, [pathname]);

  const addTrack = (track: Track) => {
    if (tracks[tracks.length - 1] == track) {
      return;
    }

    const newTracks = [...tracks, track].slice(-TRACK_LIMIT);
    setTracks(newTracks);
  };

  const getPreviousTrack = (skip?: number) => {
    const index = tracks.length - 1 - (skip || 0);
    return tracks[index];
  };

  return (
    <routeTrackContext.Provider
      value={{
        tracks,
        canBack,
        getPreviousTrack,
      }}>
      {children}
    </routeTrackContext.Provider>
  );
};

export const useRouteTrack =
  getHookOfContext<RouteTrackContext>(routeTrackContext);
