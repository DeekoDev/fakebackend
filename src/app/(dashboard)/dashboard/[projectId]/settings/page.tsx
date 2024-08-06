import { SettingsVisibilityButton } from "@/components/dashboard/settings/settings-visibility-button";
import { Button } from "@/components/ui/button";

interface Props {}

const DashboardSettingsPage = ({}: Props) => {
  return (
    <div className="py-8">
      <h1 className="text-2xl font-medium">Settings</h1>
      <p className="mt-2 text-light-600">
        Configure your project settings here.
      </p>

      <div className="mt-8 flex items-start md:items-center md:justify-between gap-8 rounded-2xl border flex-col md:flex-row bg-dark-700 p-8">
        <div>
          <h2 className="text-lg font-medium">Visibility</h2>
          <p className="mt-1 max-w-md text-light-600">
            Make your project public or private. (any person that have a Api Key
            of your project can access to your API)
          </p>
        </div>

        <SettingsVisibilityButton />
      </div>
    </div>
  );
};

export default DashboardSettingsPage;
