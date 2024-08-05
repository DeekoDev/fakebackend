import { OperationMethod } from "@/components/operation/operation-method";
import { Endpoint } from "@prisma/client";
import Link from "next/link";

interface Props extends Endpoint {}

export const EndpointCard = ({
  method,
  URI,
  projectId,
  description,
  id,
}: Props) => {
  return (
    <Link href={`/dashboard/${projectId}/endpoint/${id}`}>
      <article className="h-[125px] overflow-hidden rounded-lg border bg-dark-600 p-4 hover:bg-dark-500 transition-colors ease-in duration-100">
        <div className="flex items-center gap-2 overflow-hidden">
          <OperationMethod method={method} size="sm" />
          <p className="overflow-hidden font-medium text-ellipsis">{URI}</p>
        </div>

        {description && (
          <p className="mt-2 line-clamp-2 text-light-600">{description}</p>
        )}
      </article>
    </Link>
  );
};
