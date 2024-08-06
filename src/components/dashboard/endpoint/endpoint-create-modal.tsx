"use client";
import React, { useEffect, useMemo, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { useModal } from "@/components/providers/modal-provider";
import { Button } from "@/components/ui/button";
import { Editor } from "@/components/ui/editor";
import { Input } from "@/components/ui/input";
import { Modal } from "@/components/ui/modal";
import { Textarea } from "@/components/ui/textarea";
import { Endpoint, Project } from "@prisma/client";
import { EndpointCreateModalDropdownMethod } from "./endpoint-create-modal-dropdown-method";
import { z } from "zod";
import md5 from "md5";

import { METHOD } from "@/constants/operation.constants";
import {
  OPERATION_DEFAULT_RESPONSE_INTERFACE,
  OPERATION_DEFAULT_REQUEST_INTERFACE,
} from "@/constants/operation.constants";

import { STEP, STEP_TITLE } from "@/constants/endpoint.constants";

import { InputWrapper } from "@/components/ui/input-wrapper";

import { cn } from "@/utils/cn";
import { api } from "@/trpc/react";
import { endpointSchema } from "@/schemas/endpoint.schemas";
import { useRouter } from "next/navigation";
import { operationGenSchema } from "@/schemas/operation.schemas";
import { OperationExample } from "@/components/operation/operation-example";
import { opGenToOp } from "@/utils/op-transforms";
import { OperationCard } from "../../operation/operation-card";
import { Skeleton } from "@/components/ui/skeleton";
import { Error } from "@/components/ui/error";

interface SetupInput {
  URI: string;
  description: string;
}

interface EndpointCreateData {
  method: keyof typeof METHOD;
  URI: string;
  description: string;
  requestInterface?: string | null;
  responseInterface: string;
  rawOpExamplesPreview: z.infer<typeof operationGenSchema>[];
}

interface Props {}

export const EndpointCreateModal = ({}: Props) => {
  const modal = useModal();
  const project = modal.payload?.project as Project;
  const addEndpoint = modal.payload?.addEndpoint as (
    endpoint: Endpoint,
  ) => void;

  const [step, setStep] = useState<string>(STEP.SETUP);
  const [method, setMethod] = useState<keyof typeof METHOD>("GET");

  const [endpointData, setEndpointData] = useState<EndpointCreateData>({
    method: "GET",
    URI: "",
    description: "",
    requestInterface: null,
    responseInterface: OPERATION_DEFAULT_RESPONSE_INTERFACE,
    rawOpExamplesPreview: [],
  });
  const [lastEndpointDataHash, setLastEndpointDataHash] = useState<string>("");

  const setupForm = useForm<SetupInput>({
    defaultValues: {
      URI: "/example/:param",
      description: "",
    },
  });

  const router = useRouter();

  const createEndpointMutation = api.endpoint.create.useMutation({
    onError: () => {
      setStep(STEP.SETUP);
    },
  });

  const createManyOpExPreviewMutation =
    api.operation.createManyExamplesPreview.useMutation();
  const createManyOpExRawMutation = api.operation.createManyRaw.useMutation();
  const createManyOpExMutation = api.operation.createManyExamples.useMutation();

  const utils = api.useUtils();

  const isPendingOpMutations =
    createManyOpExPreviewMutation.isPending ||
    createManyOpExRawMutation.isPending ||
    createManyOpExMutation.isPending;

  const isErrorOpMutations =
    createManyOpExPreviewMutation.isError ||
    createManyOpExRawMutation.isError ||
    createManyOpExMutation.isError;

  const errorsOpMutations = useMemo(() => {
    let errors = [];

    if (createManyOpExPreviewMutation.error)
      errors.push({
        message: createManyOpExPreviewMutation.error.message,
        origin: "createManyOpExPreviewMutation",
      });

    if (createManyOpExRawMutation.error)
      errors.push({
        message: createManyOpExRawMutation.error.message,
        origin: "createManyOpExRawMutation",
      });

    if (createManyOpExMutation.error)
      errors.push({
        message: createManyOpExMutation.error.message,
        origin: "createManyOpExMutation",
      });

    return errors;
  }, [isErrorOpMutations]);

  useEffect(() => {
    const main = async () => {
      if (step !== STEP.RESPONSE_EXAMPLES) return;

      if (isPendingOpMutations || createEndpointMutation.isPending) return;

      const hash = md5(JSON.stringify(endpointData));
      if (hash !== "" && hash === lastEndpointDataHash) return;

      regenerateExamples();
    };

    main();
  }, [step]);

  const handleChangeMethod = (method: keyof typeof METHOD) => {
    setMethod(method);
    setEndpointData((prev) => ({ ...prev, method }));
  };

  const onSubmitSetup: SubmitHandler<SetupInput> = (data) => {
    setEndpointData((prev) => ({ ...prev, ...data }));

    if (method === METHOD.GET) {
      setStep(STEP.RESPONSE_DEFINITION);
      return;
    }

    setStep(STEP.REQUEST_DEFINITION);
  };

  const handleRequestInterfaceDef = (data?: string) => {
    setEndpointData((prev) => ({ ...prev, requestInterface: data ?? "" }));
  };

  const handleResponseInterfaceDef = (data?: string) => {
    setEndpointData((prev) => ({ ...prev, responseInterface: data ?? "" }));
  };

  const handleCreateEndpoint = async () => {
    const { rawOpExamplesPreview, ..._data }: EndpointCreateData = {
      requestInterface: method === "GET" ? null : endpointData.requestInterface,
      ...endpointData,
    };

    const safeData = endpointSchema.safeParse(_data);

    if (safeData.success === false) {
      console.log(safeData.error.errors);
      return;
    }

    modal.lock();

    try {
      createEndpointMutation.reset();
      createManyOpExRawMutation.reset();

      const endpoint = await createEndpointMutation.mutateAsync({
        projectId: project.id,
        data: safeData.data,
      });

      const operationsRaw = await createManyOpExRawMutation.mutateAsync({
        endpointId: endpoint.id,
        raws: endpointData.rawOpExamplesPreview,
      });

      await createManyOpExMutation.mutateAsync({
        endpointId: endpoint.id,
        operationsIds: operationsRaw.map((op) => op.id),
      });

      addEndpoint(endpoint);

      await Promise.all([
        utils.operation.invalidate(),
        utils.endpoint.invalidate(),
      ]);

      router.push(`/dashboard/${project.id}/endpoint/${endpoint.id}`);

      modal.unlock();
      modal.close({
        force: true,
      });
    } catch (error) {
      modal.unlock();
    }
  };

  const regenerateExamples = async () => {
    const { rawOpExamplesPreview, requestInterface, ..._exampleInputData } =
      endpointData;

    const endpointPreview = {
      ..._exampleInputData,
      requestInterface: requestInterface || null,
    } as {
      method: string;
      URI: string;
      description: string;
      requestInterface: string | null;
      responseInterface: string;
    };

    modal.lock();

    try {
      createManyOpExPreviewMutation.reset();

      const data = await createManyOpExPreviewMutation.mutateAsync({
        endpoint: endpointPreview,
        projectId: project.id,
      });

      setEndpointData((prev) => ({
        ...prev,
        rawOpExamplesPreview: data.examples,
      }));

      setLastEndpointDataHash(
        md5(
          JSON.stringify({
            ...endpointData,
            rawOpExamplesPreview: data.examples,
          }),
        ),
      );

      modal.unlock();
    } catch (error) {
      modal.unlock();
    }
  };

  const handleNext = () => {
    // the step setup control the
    // step of the modal
    if (step === STEP.SETUP) {
      setupForm.handleSubmit(onSubmitSetup)();
      return;
    }

    if (step === STEP.SETUP) {
      setStep(STEP.REQUEST_DEFINITION);
    } else if (step === STEP.REQUEST_DEFINITION) {
      setStep(STEP.RESPONSE_DEFINITION);
    } else if (step === STEP.RESPONSE_DEFINITION) {
      setStep(STEP.RESPONSE_EXAMPLES);
    }
  };

  const handleBack = () => {
    if (method === METHOD.GET && step === STEP.RESPONSE_DEFINITION) {
      setStep(STEP.SETUP);
      return;
    }

    if (step === STEP.REQUEST_DEFINITION) {
      setStep(STEP.SETUP);
    } else if (step === STEP.RESPONSE_DEFINITION) {
      setStep(STEP.REQUEST_DEFINITION);
    } else if (step === STEP.RESPONSE_EXAMPLES) {
      setStep(STEP.RESPONSE_DEFINITION);
    }
  };

  return (
    <Modal key="endpoint-create" size="md" className="p-0">
      <div className="p-6">
        <h4 className="text-lg font-medium">Create Endpoint</h4>
        <h5 className="mt-0.5 font-medium text-green-400">
          {STEP_TITLE[step as keyof typeof STEP]}
        </h5>

        {step === STEP.SETUP && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
            }}
            className="mt-6 flex flex-col gap-3"
          >
            {createEndpointMutation.isError && (
              <Error size="sm">{createEndpointMutation.error.message}</Error>
            )}

            <div className="flex gap-3">
              <EndpointCreateModalDropdownMethod
                value={method}
                changeValue={handleChangeMethod}
              />

              <InputWrapper error={setupForm.formState.errors.URI}>
                <Input
                  type="text"
                  placeholder="URI - /example/:param"
                  className="flex-grow"
                  {...setupForm.register("URI", {
                    required: "URI is required",
                    maxLength: {
                      value: 200,
                      message: "URI is too long",
                    },
                    minLength: {
                      value: 2,
                      message: "URI is too short",
                    },
                    pattern: {
                      value: /^(\/[^/:]+|\/:[^/]+)+\/?$/,
                      message: "Invalid URI",
                    },
                  })}
                />
              </InputWrapper>
            </div>

            <InputWrapper error={setupForm.formState.errors.description}>
              <Textarea
                className="w-full"
                placeholder="Endpoint Description"
                {...setupForm.register("description", {
                  required: "Description is required",
                  maxLength: {
                    value: 500,
                    message: "Description is too long",
                  },
                  minLength: {
                    value: 3,
                    message: "Description is too short",
                  },
                })}
              />
            </InputWrapper>
          </form>
        )}

        {step === STEP.REQUEST_DEFINITION && (
          <form className="mt-6 flex flex-col gap-3">
            <div>
              <p className="text-sm text-light-600">Body Interface</p>
              <Editor
                className="mt-2"
                height={200}
                editorProps={{
                  defaultLanguage: "typescript",
                  defaultValue: OPERATION_DEFAULT_REQUEST_INTERFACE,
                  onChange: handleRequestInterfaceDef,
                  value:
                    endpointData.requestInterface ??
                    OPERATION_DEFAULT_REQUEST_INTERFACE,
                  options: {
                    minimap: {
                      enabled: false,
                    },
                  },
                }}
              />
              <p className="mt-2 text-sm text-light-600">
                Create a typescript interface for the request body, you can
                added comments to describe the fields and improve fidelity.
              </p>
            </div>
          </form>
        )}

        {step === STEP.RESPONSE_DEFINITION && (
          <form className="mt-6 flex flex-col gap-3">
            <div>
              <p className="text-sm text-light-600">Response Interface</p>
              <Editor
                className="mt-2"
                height={200}
                editorProps={{
                  defaultLanguage: "typescript",
                  defaultValue: OPERATION_DEFAULT_RESPONSE_INTERFACE,
                  onChange: handleResponseInterfaceDef,
                  value:
                    endpointData.responseInterface ??
                    OPERATION_DEFAULT_RESPONSE_INTERFACE,
                  options: {
                    minimap: {
                      enabled: false,
                    },
                  },
                }}
              />
              <p className="mt-2 text-sm text-light-600">
                Create a typescript interface for the request body, you can
                added comments to describe the fields and improve fidelity.
              </p>
            </div>
          </form>
        )}

        {step === STEP.RESPONSE_EXAMPLES && (
          <div className="mt-6">
            <div className="scrollbar relative flex max-h-[400px] flex-col gap-3 overflow-y-auto pr-2">
              {isErrorOpMutations &&
                errorsOpMutations.map((error, i) => {
                  return (
                    <Error key={error.origin} size="sm">
                      {error.message}
                    </Error>
                  );
                })}

              {!isPendingOpMutations &&
                endpointData?.rawOpExamplesPreview.map((examplePreview, i) => {
                  const examplePreviewOp = opGenToOp(examplePreview);

                  return (
                    <OperationCard key={`example_${i}`} {...examplePreviewOp} />
                  );
                })}

              {isPendingOpMutations && (
                <>
                  <Skeleton className="h-[100px] w-full" />
                  <Skeleton className="h-[100px] w-full" />
                  <Skeleton className="h-[100px] w-full" />
                </>
              )}
            </div>

            <div className="mt-6 flex justify-between gap-6">
              <p className="text-sm text-light-600">
                The examples are generated automatically with AI, this examples
                improve the fidelity of the response.
              </p>
              <Button
                onClick={regenerateExamples}
                disabled={
                  isPendingOpMutations || createEndpointMutation.isPending
                }
                variant="secondary"
              >
                {createManyOpExPreviewMutation.isPending
                  ? "Regenerating..."
                  : "Regenerate"}
              </Button>
            </div>
          </div>
        )}
      </div>
      <div className="flex justify-between bg-dark-600 px-6 py-3">
        <Button
          disabled={isPendingOpMutations || createEndpointMutation.isPending}
          onClick={handleBack}
          variant="secondary"
          className={cn(step === STEP.SETUP && "invisible")}
        >
          Back
        </Button>

        {step !== STEP.RESPONSE_EXAMPLES ? (
          <Button onClick={handleNext}>Next</Button>
        ) : (
          <Button
            disabled={
              isPendingOpMutations ||
              endpointData.rawOpExamplesPreview.length === 0 ||
              createEndpointMutation.isPending
            }
            onClick={handleCreateEndpoint}
          >
            {createEndpointMutation.isPending ? "Creating..." : "Create"}
          </Button>
        )}
      </div>
    </Modal>
  );
};
