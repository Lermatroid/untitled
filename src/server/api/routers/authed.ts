import { z } from "zod";
import { createTRPCRouter, authedProcedure } from "~/server/api/trpc";

export const authedRouter = createTRPCRouter({
	updateProfileInfo: authedProcedure
		.input(z.object({ name: z.string().min(1), username: z.string().min(1) }))
		.mutation(async ({ input, ctx }) => {
			const { name, username } = input;
			const user = await ctx.prisma.userInfo.upsert({
				where: { accID: ctx.uid },
				update: {
					name,
					username,
				},
				create: {
					accID: ctx.uid,
					name,
					username,
				},
			});
			return user;
		}),
	getProfileInfo: authedProcedure.query(async ({ ctx }) => {
		const user = await ctx.prisma.userInfo.findUnique({
			where: { accID: ctx.uid },
		});
		return user;
	}),
});
