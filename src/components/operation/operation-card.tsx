import z from "zod";
import { operationSchema } from "@/schemas/operation.schemas";
import { OperationMethod } from "./operation-method";
import { useMemo } from "react";
import { getStatusInfo } from "@/utils/get-status-info";
import { formatJsonString } from "@/utils/format-json-string";
import { Code } from "@/components/ui/code";

interface Props extends z.infer<typeof operationSchema> {}

export const OperationCard = ({
  method,
  URI,
  body,
  data,
  error,
  status,
}: Props) => {
  const hasError = !!error;

  const statusInfo = useMemo(() => {
    return getStatusInfo(status);
  }, [status]);

  return (
    <div className="flex-shrink-0 overflow-hidden rounded-lg border bg-dark-600">
      <div className="flex items-center gap-2 px-4 pt-4">
        <OperationMethod method={method} size="sm" />
        <p className="flex-grow text-sm font-medium">{URI}</p>

        <div
          className="text-xs font-medium"
          style={{
            color: statusInfo.color.foreground,
          }}
        >
          {status} - {statusInfo.text}
        </div>
      </div>

      {body && (
        <>
          <p className="mt-4 px-4 text-sm text-light-600">body</p>
          <Code
            className="mt-2"
            code={formatJsonString(body || "")}
            language="json"
          />
        </>
      )}

      <p className="mt-4 px-4 text-sm text-light-600">
        {hasError ? "Error" : "Data"}
      </p>
      <Code
        className="mt-2"
        code={formatJsonString((hasError ? error : data) || "")}
        language="json"
      />
    </div>
  );
};
