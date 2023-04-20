import { TRPCError } from "@trpc/server";
import error from "next/error";
import { use } from "react";
import { z } from "zod";

import {
  createTRPCRouter,
  publicProcedure,
  protectedProcedure,
} from "~/server/api/trpc";

export const resumeRouter = createTRPCRouter({
  resume: publicProcedure
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

  getResumeByUserName: publicProcedure.input(z.object({ userName: z.string() })).query(async ({ ctx, input }) => {
    return await ctx.prisma.resume.findUnique({
      where: {
        userName: input.userName,
      },
      include: {
        Jobs: true
      }
    });
  }),

  createResume: protectedProcedure.mutation(async ({ ctx }) => {
    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    })
    if (!user?.userName) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: "user not found",
      });
    } else {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      return await ctx.prisma.resume.create({ data: { userName: user.userName } })
    }
  }),

  addJob: protectedProcedure.input(z.object({ yearFrom: z.date(), yearTo: z.date(), title: z.string(), description: z.string() })).mutation(async ({ ctx, input }) => {

    const user = await ctx.prisma.user.findUnique({
      where: {
        id: ctx.session.user.id,
      },
    })
    if (!user?.userName) {
      throw new TRPCError({
        code: 'INTERNAL_SERVER_ERROR',
        message: "user not found",
      });
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    return await ctx.prisma.jobs.create({ data: { resumeUserName: user.userName, ...input } })
  }),

  removeJob: protectedProcedure.input(z.object({ id: z.string().cuid() })).mutation(async ({ ctx, input }) => {
    await ctx.prisma.jobs.delete({
      where: {
        id: input.id,
      },
    })
  }),
});
