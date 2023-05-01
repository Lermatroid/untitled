import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { z } from "zod";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const bookStringConverter = (input: string) => {
	const ids = input.split(",");
	const validator = z.array(z.string().min(7).max(7));
	const result = validator.safeParse(ids);
	if (result.success) {
		return { success: true, data: result.data };
	} else {
		return { success: false, data: [] };
	}
};
