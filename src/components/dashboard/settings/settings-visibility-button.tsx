"use client";

import { useDashboard } from "@/components/providers/dashboard-provider";
import { Button } from "@/components/ui/button";
import { api } from "@/trpc/react";

interface Props {}

export const SettingsVisibilityButton = ({}: Props) => {
  const { project, overwriteProject } = useDashboard();
  const utils = api.useUtils();
  const switchVisibilityMutation = api.project.switchPublicStatus.useMutation({
    onSuccess: () => {
      utils.project.invalidate();
    },
  });

  const handleClick = async () => {
    if (!project) return;

    const { isPublic } = await switchVisibilityMutation.mutateAsync(
      project?.id || "",
    );

    overwriteProject({
      ...project,
      isPublic,
    });
  };

  return (
    <Button
      onClick={() => handleClick()}
      disabled={switchVisibilityMutation.isPending}
      variant={project?.isPublic ? "secondary" : "default"}
    >
      {switchVisibilityMutation.isPending
        ? "Switching..."
        : project?.isPublic
          ? "Switch to private"
          : "Switch to public"}
    </Button>
  );
};
