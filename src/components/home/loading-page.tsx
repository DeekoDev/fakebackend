import { Spinner } from "@/components/ui/spinner";

interface Props {}

export const LoadingPage = ({}: Props) => {
  return (
    <div className="mt-16 flex items-center justify-center">
      <Spinner size={"lg"} weight="thick" variant="default" />
    </div>
  );
};
