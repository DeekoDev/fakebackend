import {
  operationGenSchema,
  operationSchema,
} from "@/schemas/operation.schemas";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import z from "zod";
import { endpointSchema } from "@/schemas/endpoint.schemas";
import { generateObject } from "ai";
import { openai } from "@ai-sdk/openai";
import { OPEN_AI_MODEL } from "@/constants/ai.constnats";
import {
  getOperationExamplePrompt,
  getOperationPrompt,
} from "@/prompts/operation.prompts";
import { opGenToOp } from "@/utils/op-transforms";

export const operationRouter = createTRPCRouter({
  createManyExamplesPreview: protectedProcedure
    .input(
      z.object({
        endpoint: endpointSchema,
        projectId: z.string(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.session.user.id;
      const project = await ctx.db.project.findFirst({
        where: {
          id: input.projectId,
          authorId,
        },
      });

      if (!project) {
        throw new Error("Project not found");
      }

      const { object } = await generateObject({
        model: openai(OPEN_AI_MODEL),
        schema: z.object({
          examples: operationGenSchema.array(),
        }),
        system: getOperationExamplePrompt({
          project,
          endpoint: input.endpoint,
        }),
        prompt: "proporciona los ejemplos",
      });

      return object;
    }),

  create: publicProcedure
    .input(
      z.object({
        endpointId: z.string(),
        apiKey: z.string().optional().nullable(),
        URI: z.string(),
        body: z.string().optional().nullable(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.session?.user.id;

      let endpoint;
      let project;

      if (input.apiKey) {
        const apiKey = await ctx.db.apiKey.findFirst({
          where: {
            id: input.apiKey,
          },
          include: {
            project: true,
          },
        });

        if (!apiKey) {
          throw new Error("API Key not found");
        }

        const _endpoint = await ctx.db.endpoint.findFirst({
          where: {
            id: input.endpointId,
            projectId: apiKey.projectId,
          },
        });

        if (!_endpoint) {
          throw new Error("Endpoint not found");
        }

        project = apiKey.project;
        endpoint = _endpoint;
      } else {
        if (!authorId) {
          throw new Error("Not authorized");
        }

        const data = await ctx.db.endpoint.findFirst({
          where: {
            id: input.endpointId,
            project: {
              OR: [
                {
                  isPublic: true,
                },
                {
                  authorId,
                },
              ],
            },
          },
          include: {
            project: true,
          },
        });

        if (!data) {
          throw new Error("Endpoint not found");
        }

        const { project: _project, ..._endpoint } = data;

        endpoint = _endpoint;
        project = _project;
      }

      const { object } = await generateObject({
        model: openai(OPEN_AI_MODEL),
        schema: operationGenSchema,

        system: getOperationPrompt({
          endpoint,
          project,
        }),
        prompt: JSON.stringify({
          URI: input.URI,
          body: input.body,
        }),
      });

      const operationData = opGenToOp(object);

      return ctx.db.operation.create({
        data: {
          ...operationData,
          endpointId: input.endpointId,
          spent: 0,
        },
      });
    }),

  // create operation from a raw object
  createManyRaw: protectedProcedure
    .input(
      z.object({
        endpointId: z.string(),
        raws: operationGenSchema.array(),
      }),
    )
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.session.user.id;

      const endpoint = await ctx.db.endpoint.findFirst({
        where: {
          id: input.endpointId,
          project: {
            authorId,
          },
        },
      });

      if (!endpoint) {
        throw new Error("Endpoint not found");
      }

      const operations = input.raws.map((raw) => {
        const _operation = opGenToOp(raw);

        return {
          ..._operation,
          endpointId: input.endpointId,
          spent: 0,
        };
      });

      return ctx.db.operation.createManyAndReturn({
        data: operations,
      });
    }),

  createManyExamples: protectedProcedure
    .input(
      z.object({
        endpointId: z.string(),
        operationsIds: z.string().array(),
      }),
    )
    .mutation(async ({ ctx: { db, session }, input }) => {
      const authorId = session.user.id;

      const [endpoint, operations] = await Promise.all([
        db.endpoint.findFirst({
          where: {
            id: input.endpointId,
            project: {
              authorId,
            },
          },
        }),
        db.operation.findMany({
          where: {
            id: {
              in: input.operationsIds,
            },
            endpoint: {
              project: {
                authorId,
              },
            },
          },
        }),
      ]);

      if (!endpoint) {
        throw new Error("Endpoint not found");
      }

      if (operations.length !== input.operationsIds.length) {
        throw new Error("Operations not found");
      }

      return db.operationExample.createManyAndReturn({
        data: operations.map((operation) => ({
          operationId: operation.id,
          endpointId: endpoint.id,
        })),
      });
    }),

  createExample: protectedProcedure
    .input(
      z.object({
        endpointId: z.string(),
        operationId: z.string(),
      }),
    )
    .mutation(async ({ ctx: { db, session }, input }) => {
      const authorId = session.user.id;

      const [endpoint, operation] = await Promise.all([
        db.endpoint.findFirst({
          where: {
            id: input.endpointId,
            project: {
              authorId,
            },
          },
        }),
        db.operation.findFirst({
          where: {
            id: input.operationId,
            endpoint: {
              project: {
                authorId,
              },
            },
          },
        }),
      ]);

      if (!endpoint) {
        throw new Error("Endpoint not found");
      }

      if (!operation) {
        throw new Error("Operation not found");
      }

      return db.operationExample.create({
        data: {
          operationId: input.operationId,
          endpointId: input.endpointId,
        },
      });
    }),

  getExamplesByEndpointId: publicProcedure
    .input(z.string())
    .query(async ({ ctx: { session, db }, input }) => {
      const authorId = session?.user.id;

      const endpoint = await db.endpoint.findFirst({
        where: {
          id: input,
          project: {
            OR: [
              {
                authorId,
              },
              {
                isPublic: true,
              },
            ],
          },
        },
      });

      if (!endpoint) {
        throw new Error("Endpoint not found");
      }

      return db.operationExample.findMany({
        where: {
          endpointId: input,
        },
        include: {
          operation: true,
          endpoint: true,
        },
      });
    }),

  getByEndpointId: publicProcedure
    .input(z.string())
    .query(async ({ ctx: { session, db }, input }) => {
      const authorId = session?.user.id;

      const endpoint = await db.endpoint.findFirst({
        where: {
          id: input,
          project: {
            OR: [
              {
                authorId,
              },
              {
                isPublic: true,
              },
            ],
          },
        },
      });

      if (!endpoint) {
        throw new Error("Endpoint not found");
      }

      return db.operation.findMany({
        where: {
          endpointId: input,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }),

  getExampleByEndpointId: publicProcedure
    .input(
      z.object({
        endpointId: z.string(),
        method: z.enum(["GET", "POST", "PUT", "DELETE"]).optional().nullable(),
        status: z.number().optional().nullable(),
      }),
    )
    .query(async ({ ctx: { session, db }, input }) => {
      const authorId = session?.user.id;

      const endpoint = await db.endpoint.findFirst({
        where: {
          id: input.endpointId,
          project: {
            OR: [
              {
                authorId,
              },
              {
                isPublic: true,
              },
            ],
          },
        },
      });

      if (!endpoint) {
        throw new Error("Endpoint not found");
      }

      return db.operation.findFirst({
        where: {
          endpointId: input.endpointId,
          ...(input.method
            ? {
                method: input.method,
              }
            : {}),
          ...(input.status
            ? {
                status: input.status,
              }
            : {}),
        },
      });
    }),
});
