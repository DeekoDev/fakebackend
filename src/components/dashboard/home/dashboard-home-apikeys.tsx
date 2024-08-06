import { Button } from "@/components/ui/button";
import { Eye, Copy, Trash } from "lucide-react";
import { DashboardHomeApiKeysCreate } from "./dashboard-home-apikeys-create";
import { DashboardHomeApiKeysContainer } from "./dashboard-home-apikeys-container";

interface Props {}

export const DashboardHomeApiKeys = ({}: Props) => {
  return (
    <div className="mt-8 w-full rounded-2xl border bg-dark-700 p-8 pb-12 shadow-lg">
      <h2 className="text-lg font-medium">API KEY</h2>
      <p className="mt-2 max-w-md text-light-600">
        You can create a new API Key to access to your project from external
        clients.
      </p>

      <DashboardHomeApiKeysCreate />
      <DashboardHomeApiKeysContainer />
    </div>
  );
};
