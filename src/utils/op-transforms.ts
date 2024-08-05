import {
  operationGenSchema,
  operationSchema,
} from "@/schemas/operation.schemas";
import z from "zod";

export const opGenToOp = (
  operationGen: z.infer<typeof operationGenSchema>,
): z.infer<typeof operationSchema> => {
  return {
    // request
    body: operationGen.request.body,
    method: operationGen.request.method,
    URI: operationGen.request.URI,

    // response
    data: operationGen.response.data,
    error: operationGen.response.error,
    status: operationGen.response.status,
  };
};

export const opToOpGen = (
  operation: z.infer<typeof operationSchema>,
): z.infer<typeof operationGenSchema> => {
  return {
    request: {
      URI: operation.URI,
      method: operation.method,
      body: operation.body,
    },
    response: {
      status: operation.status,
      data: operation.data,
      error: operation.error,
    },
  };
};
