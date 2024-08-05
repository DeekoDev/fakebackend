"use client";
import { useDashboard } from "@/components/providers/dashboard-provider";
import { useModal } from "@/components/providers/modal-provider";
import { useSession } from "@/components/providers/session-provider";
import { Button } from "@/components/ui/button";

interface Props {}

export const DashboardSidenavEndpointCreate = ({}: Props) => {
  const modal = useModal();
  const { session } = useSession();
  const { project, addEndpoint } = useDashboard();

  const handleClick = () => {
    modal.open("endpoint-create", { project, addEndpoint });
  };

  if (session?.user.id !== project?.authorId) return;

  return (
    <Button
      onClick={handleClick}
      variant="secondary"
      className="mt-3 w-full justify-center"
    >
      Create Endpoint
    </Button>
  );
};
