import z from "zod";
import { METHOD } from "@/constants/operation.constants";

export const requestSchema = z.object({
  URI: z.string(),
  method: z.enum([METHOD.GET, METHOD.POST, METHOD.PUT, METHOD.DELETE]),
  body: z.string().nullable(),
});

export const responseSchema = z.object({
  status: z.number(),
  data: z.string().nullable(),
  error: z.string().nullable(),
});

export const operationGenSchema = z.object({
  request: requestSchema,
  response: responseSchema,
});

export const operationSchema = requestSchema.merge(responseSchema);
