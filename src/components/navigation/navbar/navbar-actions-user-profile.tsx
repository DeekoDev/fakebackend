"use client";

import { useSession } from "@/components/providers/session-provider";
import { Overlay } from "@/components/ui/overlay";
import { USER_DEFAULT_IMAGE } from "@/constants/user.constants";
import { useDropdown } from "@/hooks/use-dropdown";
import { LogOut, User } from "lucide-react";

import Link from "next/link";

interface Props {}

export const NavbarActionsUserProfile = ({}: Props) => {
  const { session } = useSession();
  const { open, isOpen, toggle, close } = useDropdown();

  // convert this to a dropdown component
  return (
    <>
      <div className="relative z-20">
        <img
          role="button"
          src={session?.user.image || USER_DEFAULT_IMAGE}
          className="clicky relative h-10 w-10 rounded-full border object-cover object-top"
          alt={`${session?.user.username}'s profile picture`}
          onClick={toggle}
        />

        {isOpen && (
          <div className="absolute right-0 mt-2 w-[220px] rounded-2xl border bg-dark-600 shadow-lg animate-in fade-in-0 slide-in-from-top-2">
            <div className="flex gap-3 border-b p-4">
              <img
                src={session?.user.image || USER_DEFAULT_IMAGE}
                alt={`${session?.user.username}'s profile picture`}
                className="relative h-11 w-11 flex-shrink-0 rounded-full border object-cover object-top"
              />
              <div>
                <p className="font-medium">Deeko</p>
                <p className="text-sm text-light-600">@deeko</p>
              </div>
            </div>

            <div className="gap-2 space-y-1 p-2">
              <Link
                href={`/u/${session?.user.username}`}
                className="flex w-full items-center gap-2 rounded-md p-2 text-left text-sm text-light-600 hover:bg-dark-500 hover:text-light-500"
              >
                <User className="inline-block h-4 w-4" />
                Profile
              </Link>
              <button className="flex w-full items-center gap-2 rounded-xl px-3 py-3 text-left text-sm text-light-600 hover:bg-dark-500 hover:text-light-500">
                <LogOut className="inline-block h-4 w-4" />
                Logout
              </button>
            </div>
          </div>
        )}
      </div>

      {isOpen && <Overlay onClose={close} className="z-10" />}
    </>
  );
};
