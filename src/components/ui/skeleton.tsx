import { cn } from "@/utils/cn";

export const Skeleton = ({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => {
  return (
    <div
      className={cn("animate-pulse rounded-lg bg-dark-500", className)}
      {...props}
    />
  );
};
