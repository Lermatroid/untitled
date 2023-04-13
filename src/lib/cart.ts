import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Book } from "./types";

interface cartState {
	cart: { [key: string]: Book };
	addBook: (book: Book) => void;
	removeBook: (id: string) => void;
}

export const useCart = create<cartState>()(
	persist(
		(set, get) => ({
			cart: {},
			addBook: (book) =>
				set((state) => {
					if (state.cart[book.id]) {
						return state;
					}
					return { cart: { ...state.cart, [book.id]: book } };
				}),
			removeBook: (id) =>
				set((state) => {
					const cart = { ...state.cart };
					delete cart[id];
					return { cart };
				}),
		}),
		{
			name: "cart",
		}
	)
);
