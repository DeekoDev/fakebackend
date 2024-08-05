"use client";
import { useDashboard } from "@/components/providers/dashboard-provider";
import { DashboardHomeApiKeysItem } from "./dashboard-home-apikeys-item";
import { Skeleton } from "@/components/ui/skeleton";

interface Props {}

export const DashboardHomeApiKeysContainer = ({}: Props) => {
  const { apiKeys, isPendingApiKeys } = useDashboard();

  if (isPendingApiKeys) {
    return <Skeleton className="mt-6 max-w-md w-full h-[40px]" />;
  }

  if (apiKeys.length === 0) {
    return null;
  }

  return (
    <div className="mt-6 flex max-w-md flex-col text-sm text-light-600">
      {apiKeys.map((apiKey) => {
        return <DashboardHomeApiKeysItem key={apiKey.id} {...apiKey} />;
      })}
    </div>
  );
};
