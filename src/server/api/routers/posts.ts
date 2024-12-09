import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import z from "zod";

import { TRPCError } from "@trpc/server";

// const ratelimit = new Ratelimit({
//   redis: Redis.fromEnv(),
//   limiter: Ratelimit.slidingWindow(5, "1 m"),
//   analytics: true,
// });

export const postsRouter = createTRPCRouter({
  getAll: publicProcedure
    .input(
      z.object({
        cursor: z.number().nullish(),
        skip: z.number().optional(),
      })
    )
    .query(async ({ ctx, input }) => {
      const limit = 20;
      const { skip, cursor } = input;

      const items = await ctx.prisma.post.findMany({
        take: limit + 1,
        skip: skip,
        cursor: cursor ? { id: cursor } : undefined,
        orderBy: { createDate: "desc" },
      });

      let nextCursor: typeof cursor | undefined = undefined;
      if (items.length > limit) {
        const nextItem = items.pop(); // return the last item from the array
        nextCursor = nextItem?.id;
      }

      return {
        items,
        nextCursor,
      };
    }),
  create: publicProcedure
    .input(z.object({ content: z.string() }))
    .mutation(async ({ ctx, input }) => {
      const ip = ctx.requestIp;

      let isLimited = true;

      if (ip) {
        // const { success } = await ratelimit.limit(ip);
        // isLimited = !success;
        isLimited = false;
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
