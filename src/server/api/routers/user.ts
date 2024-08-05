import z from "zod";
import { createTRPCRouter, protectedProcedure, publicProcedure } from "../trpc";
import { updateUsernameSchema } from "@/schemas/user.schemas";
import { UserFormatter } from "@/formatters/user.formatter";

export const userRouter = createTRPCRouter({
  findById: publicProcedure.input(z.string()).query(async ({ ctx, input }) => {
    const isOwner = ctx.session?.user.id === input;
    const user = await ctx.db.user.findUnique({
      where: {
        id: input,
      },
    });

    if (!user) return null;
    if (isOwner) return user;

    return UserFormatter.public(user);
  }),

  findByUsername: publicProcedure
    .input(z.string())
    .query(async ({ ctx, input }) => {
      const isOwner = ctx.session?.user.id === input;
      const username = input.toLowerCase();
      const user = await ctx.db.user.findFirst({
        where: {
          username: username,
        },
      });

      if (isOwner) return user;
      if (!user) return null;

      return UserFormatter.public(user);
    }),

  updateUsername: protectedProcedure
    .input(updateUsernameSchema)
    .mutation(async ({ ctx, input }) => {
      const userId = ctx.session.user.id;
      const username = input.username.toLowerCase();

      // validate if other users have the same username
      const usernameExists = await ctx.db.user.findFirst({
        where: {
          username,
          id: {
            not: userId,
          },
        },
      });

      if (usernameExists) {
        throw new Error("Username already exists");
      }

      return ctx.db.user.update({
        where: {
          id: userId,
        },
        data: {
          username,
        },
      });
    }),
});
