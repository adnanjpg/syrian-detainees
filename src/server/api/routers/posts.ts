import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import z from "zod";

import { TRPCError } from "@trpc/server";

const ratelimit = new Ratelimit({
  redis: Redis.fromEnv(),
  limiter: Ratelimit.slidingWindow(5, "1 m"),
  analytics: true,
});

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure.query(async ({ ctx }) => {
    try {
      const data = await ctx.prisma.post.findMany({
        take: 20,
        orderBy: { createDate: "desc" },
      });
      return data;
    } catch (e) {
      console.log("catching errors babyyy", e);
    }
  }),
  create: publicProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const ip = ctx.requestIp;

      let isLimited = true;

      if (ip) {
        const { success } = await ratelimit.limit(ip);
        isLimited = !success;
      }

      if (isLimited) {
        throw new TRPCError({
          code: "TOO_MANY_REQUESTS",
          message: "Too many requests",
        });
      }

      return ctx.prisma.post.create({
        data: {
          content: input.content,
        },
      });
    }),
});
