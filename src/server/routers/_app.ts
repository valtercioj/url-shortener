import { z } from "zod";
import { procedure, router } from "../trpc";

export const appRouter = router({
  shortener: procedure
    .input(
      z.object({
        id: z.number(),
      })
    )

    .query(async ({ input, ctx }) => {
      const resp = await ctx.prisma.link.findFirst({
        where: {
          id: input.id,
        },
      });
      return {
        urlShortener: `${resp?.idLink}`,
      };
    }),
  link: procedure
    .input(
      z.object({
        idLink: z.string(),
      })
    )

    .query(async ({ input, ctx }) => {
      const resp = await ctx.prisma.link.findFirst({
        where: {
          idLink: input.idLink,
        },
      });
      return {
        url: `${resp?.url}`,
      };
    }),
  createLink: procedure
    .input(
      z.object({
        url: z.string(),
      })
    )
    .mutation(async ({ input, ctx }) => {
      const resp = await ctx.prisma.link.create({
        data: {
          url: input.url,
        },
      });
      return {
        message: `${resp.id}`,
      };
    }),
});

// export type definition of API
export type AppRouter = typeof appRouter;
