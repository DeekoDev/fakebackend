import { endpointSchema } from "@/schemas/endpoint.schemas";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import z from "zod";
import { Project } from "@prisma/client";

export const endpointRouter = createTRPCRouter({
  create: protectedProcedure
    .input(
      z.object({
        projectId: z.string(),
        data: endpointSchema,
      }),
    )
    .mutation(async ({ ctx, input }) => {
      // validate if the project exist
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

      return ctx.db.endpoint.create({
        data: {
          ...input.data,
          project: {
            connect: {
              id: input.projectId,
            },
          },
        },
      });
    }),

  findByProjectId: publicProcedure.input(z.string()).query(({ input, ctx }) => {
    const authorId = ctx.session?.user.id;

    const project = ctx.db.project.findUnique({
      where: {
        id: input,
        OR: [
          {
            authorId,
          },
          {
            isPublic: true,
          },
        ],
      },
    });

    if (!project) {
      throw new Error("Project not found");
    }

    return ctx.db.endpoint.findMany({
      where: {
        projectId: input,
      },
    });
  }),

  getById: publicProcedure.input(z.string()).query(async ({ input, ctx }) => {
    const authorId = ctx.session?.user.id;
    const endpoint = await ctx.db.endpoint.findFirst({
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

    return endpoint;
  }),

  findByApiKey: publicProcedure
    .input(z.string())
    .query(async ({ input, ctx }) => {
      const apiKey = await ctx.db.apiKey.findFirst({
        where: {
          id: input,
        },
        include: {
          project: true,
        },
      });

      if (!apiKey) {
        throw new Error("API Key not found");
      }

      return ctx.db.endpoint.findMany({
        where: {
          projectId: apiKey.project.id,
        },
      });
    }),
});
