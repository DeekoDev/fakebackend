"use client";
import { useModal } from "@/components/providers/modal-provider";
import { Editor } from "@/components/ui/editor";
import { Modal } from "@/components/ui/modal";
import { api } from "@/trpc/react";
import { Endpoint } from "@prisma/client";
import { OperationMethod } from "../../operation/operation-method";
import { OperationExample } from "../../operation/operation-example";
import { OperationCard } from "../../operation/operation-card";

interface Props {}

export const EndpointDefinitionModal = ({}: Props) => {
  const modal = useModal();
  const endpoint = modal.payload?.endpoint as Endpoint | null;

  const operationExamples = api.operation.getExamplesByEndpointId.useQuery(
    endpoint?.id || "",
  );

  if (!endpoint) return null;

  return (
    <Modal
      key="endpoint-definition"
      size={"md"}
      className="scrollbar max-h-[80dvh] overflow-y-auto"
    >
      <div className="flex items-center gap-2">
        <OperationMethod method={endpoint.method} />
        <h1 className="text-lg">{endpoint.URI}</h1>
      </div>

      <p className="mt-2 text-light-600">{endpoint.description}</p>

      {endpoint.requestInterface && (
        <div className="mt-6">
          <h2>Request Interface</h2>
          <Editor
            className="mt-2"
            height={150}
            editorProps={{
              defaultLanguage: "typescript",
              defaultValue: endpoint.requestInterface,
              options: {
                readOnly: true,
                wordWrap: "on",
                wrappingIndent: "indent",
                minimap: {
                  enabled: false,
                },
              },
            }}
          />
        </div>
      )}

      <div className="mt-6">
        <h2>Response Interface</h2>
        <Editor
          className="mt-2"
          height={150}
          editorProps={{
            defaultLanguage: "typescript",
            defaultValue: endpoint.responseInterface,
            options: {
              readOnly: true,
              wordWrap: "on",
              wrappingIndent: "indent",
              minimap: {
                enabled: false,
              },
            },
          }}
        />
      </div>

      <div className="mt-6">
        <h2>Examples</h2>
        <div className="flex flex-col gap-4 mt-2">
          {operationExamples.data?.map((opExample, i) => {
            const op = opExample.operation;
            return <OperationCard key={`example_${i}`} {...op} />;
            return <OperationExample key={`example_${i}`} {...op} />;
          })}

          {operationExamples.isPending && (
            <>
              <div className="h-[100px] w-full animate-pulse rounded-lg bg-dark-600"></div>
              <div className="h-[100px] w-full animate-pulse rounded-lg bg-dark-600"></div>
              <div className="h-[100px] w-full animate-pulse rounded-lg bg-dark-600"></div>
            </>
          )}
        </div>
      </div>
    </Modal>
  );
};
