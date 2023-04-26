import { z } from "zod";

export interface Book {
	id: string;
	title: string;
	description: string;
	author: string;
	price: number;
	rating: number;
	coverImage: string;
}

export const bookSchema = z.object({
	id: z.string(),
	title: z.string(),
	description: z.string(),
	author: z.string(),
	price: z.number().min(0),
	rating: z.number().min(0).max(5),
	coverImage: z.string().url(),
});
