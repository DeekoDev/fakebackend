import { METHOD } from "@/constants/operation.constants";
import z from "zod";

export const endpointExampleSchema = z.object({
  request: z.string(),
  response: z.string(),
});

export const endpointExampleGenerationSchema = z.object({
  request: z.object({
    URI: z.string(),
    method: z.enum([METHOD.GET, METHOD.POST, METHOD.PUT, METHOD.DELETE]),
    body: z.string().nullable(),
  }),
  response: z.object({
    status: z.number(),
    data: z.string().nullable(),
    error: z.string().nullable(),
  }),
});

export const endpointSchema = z.object({
  URI: z.string().min(2).max(200),
  method: z.enum([METHOD.GET, METHOD.POST, METHOD.PUT, METHOD.DELETE]),
  description: z.string().min(3).max(500),
  responseInterface: z.string().min(3).max(1000),
  requestInterface: z.string().max(1000).nullable(),
});
