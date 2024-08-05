import { Button } from "@/components/ui/button";
import { Overlay } from "@/components/ui/overlay";
import { useDropdown } from "@/hooks/use-dropdown";
import { cn } from "@/utils/cn";
import { ChevronDown } from "lucide-react";
import { METHOD } from "@/constants/operation.constants";

interface Props {
  value: string;
  changeValue: (value: keyof typeof METHOD) => void;
}

export const EndpointCreateModalDropdownMethod = ({
  value,
  changeValue,
}: Props) => {
  const { open, isOpen, toggle, close } = useDropdown();

  const handleClickButton = (method: keyof typeof METHOD) => {
    return () => {
      changeValue(method);
      close();
    };
  };

  return (
    <>
      <div className="relative z-50">
        <Button onClick={toggle} type="button" variant="secondary">
          {value}
          <ChevronDown
            className={cn(
              "h-4 w-4 transition-transform duration-100",
              isOpen && "rotate-180",
            )}
          />
        </Button>
        {isOpen && (
          <div className="scrollbar absolute left-0 mt-2 flex max-h-[120px] w-[150px] flex-col overflow-auto rounded-lg border bg-dark-600 p-2 shadow-lg animate-in fade-in-0 slide-in-from-top-2">
            <EndpointCreateModalDropdownMethodButton
              handleClick={handleClickButton("GET")}
              method="GET"
            />
            <EndpointCreateModalDropdownMethodButton
              handleClick={handleClickButton("POST")}
              method="POST"
            />
            <EndpointCreateModalDropdownMethodButton
              handleClick={handleClickButton("PUT")}
              method="PUT"
            />
            <EndpointCreateModalDropdownMethodButton
              handleClick={handleClickButton("DELETE")}
              method="DELETE"
            />
          </div>
        )}
      </div>

      {isOpen && <Overlay onClose={close} className="z-40" />}
    </>
  );
};

const EndpointCreateModalDropdownMethodButton = ({
  method,
  handleClick,
}: {
  method: keyof typeof METHOD;
  handleClick: () => void;
}) => {
  return (
    <button
      onClick={handleClick}
      type="button"
      className="w-full items-center rounded-md p-2 text-left text-sm text-light-600 hover:bg-dark-500 hover:text-light-500"
    >
      {method}
    </button>
  );
};
