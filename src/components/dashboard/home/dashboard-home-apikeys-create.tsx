"use client";

import { useDashboard } from "@/components/providers/dashboard-provider";
import { Button } from "@/components/ui/button";
import { Error } from "@/components/ui/error";
import { MAX_APIKEYS } from "@/constants/project.constants";
import { api } from "@/trpc/react";

interface Props {}

export const DashboardHomeApiKeysCreate = ({}: Props) => {
  const { project, addApiKey, apiKeys } = useDashboard();
  const createApiKeyMutation = api.project.createApiKey.useMutation();
  const utils = api.useUtils();
  const hasReachedMaxApiKeys = apiKeys.length >= MAX_APIKEYS;

  const handleClickCreate = async () => {
    if (!project) return;
    const apiKey = await createApiKeyMutation.mutateAsync(project.id);
    await Promise.all([
      utils.project.getApiKeys.invalidate(),
      utils.project.findByApiKey.invalidate(),
    ]);

    addApiKey(apiKey);
  };

  return (
    <>
      <div className="mt-8 flex gap-3">
        <Button
          variant={ apiKeys.length === 0 ? "default" : "secondary" }
          disabled={createApiKeyMutation.isPending || hasReachedMaxApiKeys}
          onClick={() => handleClickCreate()}
        >
          {!createApiKeyMutation.isPending ? "Create API KEY" : "Creating..."}
        </Button>
        {/* <Button variant="secondary">Documentation</Button> */}
      </div>

      {createApiKeyMutation.error && (
        <Error className="mt-4">{createApiKeyMutation.error.message}</Error>
      )}
    </>
  );
};
