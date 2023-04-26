import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { env } from "~/env.mjs";
import { createTRPCRouter, adminProcedure } from "~/server/api/trpc";
import { nanoid } from "nanoid";

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
					id: nanoid(7),
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
});
