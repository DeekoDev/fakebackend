import { Button } from "@/components/ui/button";
import { Eye, Copy, Trash } from "lucide-react";
import { DashboardHomeApiKeysCreate } from "./dashboard-home-apikeys-create";
import { DashboardHomeApiKeysContainer } from "./dashboard-home-apikeys-container";

interface Props {}

export const DashboardHomeApiKeys = ({}: Props) => {
  return (
    <div className="mt-8 w-full rounded-2xl border bg-dark-700 shadow-lg p-8 pb-12">
      
        <h2 className="text-lg font-medium">API KEY</h2>
        <p className="mt-4 max-w-md text-light-600">
          Create a API KEY to access to the API from your app! (you can test the
          API's without key on fakebackend)
        </p>

        <DashboardHomeApiKeysCreate />
        <DashboardHomeApiKeysContainer />
    
    </div>
  );
};
