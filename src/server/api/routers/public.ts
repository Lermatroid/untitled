import { z } from "zod";
import { env } from "~/env.mjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const publicRouter = createTRPCRouter({
	validateLogin: publicProcedure
		.input(
			z.object({ username: z.string().min(1), password: z.string().min(1) })
		)
		.mutation(async ({ input, ctx }) => {
			const { username, password } = input;
			return username === env.ADMIN_UNAME && password === env.ADMIN_PASS;
		}),
});
