import { cn } from "@/utils/cn";
import { FieldError } from "react-hook-form";

interface Error extends FieldError {}

interface InputWrapperProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  error?: Error;
  errorProps?: React.HTMLAttributes<HTMLParagraphElement>;
}

export const InputWrapper = ({
  children,
  className,
  error,
  errorProps,
  ...props
}: InputWrapperProps) => {
  const { className: errorClassName, ...errorPropsRest } = errorProps || {};

  return (
    <div className={cn("w-full",className)} {...props}>
      {children}
      {error && (
        <p
          className={cn("mt-2 text-sm text-red-500", errorClassName)}
          {...errorPropsRest}
        >
          {error?.message}
        </p>
      )}
    </div>
  );
};
