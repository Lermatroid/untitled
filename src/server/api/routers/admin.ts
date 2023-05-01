import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { env } from "~/env.mjs";
import { createTRPCRouter, adminProcedure } from "~/server/api/trpc";
import { nanoid } from "nanoid";
import { get } from "@vercel/edge-config";

export const adminRouter = createTRPCRouter({
	validateLogin: adminProcedure
		.input(
			z.object({ username: z.string().min(1), password: z.string().min(1) })
		)
		.mutation(async ({ input, ctx }) => {
			const { username, password } = input;
			return username === env.ADMIN_UNAME && password === env.ADMIN_PASS;
		}),
	addBook: adminProcedure
		.input(
			z.object({
				title: z.string(),
				description: z.string(),
				author: z.string(),
				price: z.number().min(0),
				rating: z.number().min(0).max(5),
				coverImage: z.string().url(),
			})
		)
		.mutation(async ({ input, ctx }) => {
			if (!ctx.isAdmin) throw new TRPCError({ code: "UNAUTHORIZED" });

			const { title, description, author, price, rating, coverImage } = input;
			const book = await ctx.prisma.book.create({
				data: {
					id: nanoid(7).toLowerCase(),
					title,
					description,
					author,
					price,
					rating,
					cover: coverImage,
				},
			});
			return book;
		}),
	setFeaturedBooks: adminProcedure
		.input(z.array(z.string().min(7).max(7)))
		.mutation(async ({ input, ctx }) => {
			if (!ctx.isAdmin) throw new TRPCError({ code: "UNAUTHORIZED" });
			const updateEdgeConfig = await fetch(
				`https://api.vercel.com/v1/edge-config/${env.VERCEL_EDGE_CONFIG_ID}/items`,
				{
					method: "PATCH",
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${env.VERCEL_API_TOKEN}`,
					},
					body: JSON.stringify({
						items: [
							{
								operation: "update",
								key: "booksToFeature",
								value: input,
							},
						],
					}),
				}
			);
			const res = await updateEdgeConfig.json();
			if (res.success) {
				return { success: true, newConfig: get("booksToFeature") };
			} else {
				return { success: false, newConfig: null };
			}
		}),
});
