import { z } from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { projectSchema } from "@/schemas/project.schemas";
import { usernameSchema } from "@/schemas/user.schemas";
import { MAX_APIKEYS } from "@/constants/project.constants";

export const projectRouter = createTRPCRouter({
  findById: publicProcedure.input(z.string()).query(({ input, ctx }) => {
    const authorId = ctx.session?.user.id;

    const project = ctx.db.project.findFirst({
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

    return project;
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

      return apiKey.project;
    }),

  findByUsername: publicProcedure
    .input(usernameSchema)
    .query(async ({ ctx, input }) => {
      const authorId = ctx.session?.user.id;

      const projects = await ctx.db.project.findMany({
        where: {
          author: {
            username: input,
          },
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

      return projects;
    }),

  create: protectedProcedure
    .input(projectSchema)
    .mutation(async ({ ctx, input }) => {
      const authorId = ctx.session.user.id;

      return ctx.db.project.create({
        data: {
          name: input.name,
          description: input.description ?? "",
          author: {
            connect: {
              id: authorId,
            },
          },
        },
      });
    }),

  createApiKey: protectedProcedure
    .input(z.string())
    .mutation(async ({ ctx, input }) => {
      const projectId = input;
      const authorId = ctx.session.user.id;

      const project = await ctx.db.project.findFirst({
        where: {
          id: projectId,
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

      const apikeys = await ctx.db.apiKey.findMany({
        where: {
          projectId: project.id,
          authorId,
        },
      });

      if (apikeys.length >= MAX_APIKEYS) {
        throw new Error("You have reached the maximum number of API keys");
      }

      return ctx.db.apiKey.create({
        data: {
          projectId: project.id,
          authorId,
        },
      });
    }),

  getApiKeys: protectedProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const projectId = input;
      const authorId = ctx.session.user.id;

      const project = await ctx.db.project.findFirst({
        where: {
          id: projectId,
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

      return ctx.db.apiKey.findMany({
        where: {
          projectId: project.id,
          authorId,
        },
      });
    }),
});
