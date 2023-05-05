import { z } from "zod";
import { env } from "~/env.mjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import { get } from "@vercel/edge-config";

export const publicRouter = createTRPCRouter({
	validateLogin: publicProcedure
		.input(
			z.object({ username: z.string().min(1), password: z.string().min(1) })
		)
		.mutation(async ({ input, ctx }) => {
			const { username, password } = input;
			return username === env.ADMIN_UNAME && password === env.ADMIN_PASS;
		}),
	getFeaturedBooks: publicProcedure.query(
		async ({ ctx }) => (await get("booksToFeature")) as string[]
	),
	checkIfUsernameIsTaken: publicProcedure
		.input(z.string())
		.mutation(async ({ input, ctx }) => {
			const users = await ctx.prisma.userInfo.findMany({
				where: {
					username: input,
				},
			});
			return users.length > 0;
		}),
});
