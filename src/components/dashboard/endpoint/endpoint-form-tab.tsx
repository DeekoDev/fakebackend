import { cn } from "@/utils/cn";

interface Props {
  handleClick: () => void;
  children: React.ReactNode;
  isActive: boolean;
}

export const EndpointFormTab = ({ children, isActive, handleClick }: Props) => {
  return (
    <button
      type="button"
      className={cn(
        "clicky w-[80px] rounded-full px-2 py-2 text-sm font-medium",
        isActive ? "border border-transparent bg-light-900" : "hover border",
      )}
      onClick={() => handleClick()}
    >
      {children}
    </button>
  );
};
