import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const exampleRouter = createTRPCRouter({
  hello: publicProcedure
    .input(z.object({ text: z.string(), name: z.string().optional(), phone: z.number() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
        resume: {
          name: input.name,
          phone: input.phone,
        }
      };
    }),

  createUserName: protectedProcedure.input(z.object({ userName: z.string().min(5, 'user name must be greater than 5') })).mutation(async ({ ctx, input }) => {
    return await ctx.prisma.user.update(
      {
        where: {
          id: ctx.session.user.id,
        },
        data: {
          userName: input.userName,
        }
      }
    )
  }),

  getUser: protectedProcedure.query(async ({ ctx }) => {
    return await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id
      }
    })

  }),

  getAll: publicProcedure.query(({ ctx }) => {
    return ctx.prisma.example.findMany();
  }),

  getSecretMessage: protectedProcedure.query(() => {
    return "you can now see this secret message!";
  }),
});
