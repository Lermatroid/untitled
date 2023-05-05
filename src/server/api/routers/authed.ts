import { TRPCError } from "@trpc/server";
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
		console.log("===== GETTING PROFILE INFO =====");
		const user = await ctx.prisma.userInfo.findUnique({
			where: { accID: ctx.uid },
		});
		console.log("Looked up user and found: ", user);
		return user;
	}),
	createReview: authedProcedure
		.input(
			z.object({
				title: z.string().min(1),
				body: z.string().min(1),
				rating: z.number().min(1).max(5),
				bookID: z.string().min(1),
			})
		)
		.mutation(async ({ input, ctx }) => {
			const authorInfo = await ctx.prisma.userInfo.findUnique({
				where: { accID: ctx.uid },
			});
			if (!authorInfo) {
				throw new TRPCError({
					code: "NOT_FOUND",
					message: "Account not found",
				});
			}
			const { username } = authorInfo;
			const { title, body, rating, bookID } = input;
			const review = await ctx.prisma.review.upsert({
				where: {
					id: `${ctx.uid}${bookID}`,
				},
				update: {
					title,
					body,
					rating,
				},
				create: {
					id: `${ctx.uid}${bookID}`,
					title,
					body,
					rating,
					bookID,
					authorID: ctx.uid,
					authorName: username,
				},
			});
			return;
		}),
	myReviews: authedProcedure.query(async ({ ctx }) => {
		const reviews = await ctx.prisma.review.findMany({
			where: { authorID: ctx.uid },
		});
		return reviews;
	}),
});
