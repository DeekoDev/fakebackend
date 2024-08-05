import { operationSchema } from "@/schemas/operation.schemas";
import z from "zod";

interface Props extends z.infer<typeof operationSchema> {}

export const OperationExample = ({ data, method, URI }: Props) => {
  return (
    <div className="mt-2 rounded-lg border bg-dark-600 p-3 text-sm">
      <p>
        {method} - {URI}
      </p>
      <p className="mt-2 whitespace-pre-wrap text-light-600">
        {JSON.stringify(JSON.parse(data || ""), null, 3)}
      </p>
    </div>
  );
};
