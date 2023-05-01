import { type NextPage } from "next";
import { useCart } from "~/lib/cart";
import { Book } from "~/lib/types";
import { type FunctionComponent } from "react";
import Image from "next/image";
import useHasHydrated from "~/lib/useHasHydrated";
import { AiFillStar } from "react-icons/ai";

interface cartListingProps extends Book {
	removeCallback: (id: string) => void;
}

const Cart: NextPage = () => {
	const hasHydrated = useHasHydrated();
	const { cart, removeBook } = useCart();

	const handleRemove = (id: string) => {
		removeBook(id);
		alert("Removed from cart!");
	};

	return (
		<main className="mx-auto min-h-screen w-full max-w-[1024px] pt-40">
			<h1 className="mb-2 font-calsans text-6xl font-black">Cart</h1>
			<div className="grid w-full grid-cols-3 gap-2">
				<div className="col-span-2 rounded-xl border-2 border-b-4 border-black">
					{cart && hasHydrated
						? Object.values(cart).map((book) => (
								<CartListing {...book} removeCallback={handleRemove} />
						  ))
						: "No books in cart"}
				</div>
				<div className="h-min rounded-xl border-2 border-b-4 border-black p-4">
					<div className="mx-auto max-w-[250px]">
						<p className="mb-3 text-center font-mono font-bold">Receipt</p>
						{cart && hasHydrated ? (
							<CheckoutListing books={Object.values(cart)} />
						) : null}
						<button className="mt-3 w-full rounded bg-black px-5 py-4 text-center font-calsans font-bold text-white hover:bg-gray-950">
							Checkout
						</button>
					</div>
				</div>
			</div>
		</main>
	);
};

const CheckoutListing: FunctionComponent<{ books: Book[] }> = ({ books }) => {
	const total = books.reduce((acc, book) => acc + book.price, 0);
	return (
		<div className="mx-auto">
			<div className="flex items-end border-b border-b-black font-mono">
				<p className="mr-1">+</p>
				<p>
					{books.map((b) => {
						return (
							<>
								{b.price}
								<br />
							</>
						);
					})}
				</p>
			</div>
			<p className="font-mono font-bold">
				<span className="mr-1">$</span>
				{total}
			</p>
		</div>
	);
};

const CartListing: FunctionComponent<cartListingProps> = (book) => {
	const { title, price, author, rating, removeCallback, id } = book;
	return (
		<div className="grid h-[250px] w-full grid-cols-3 border-b border-b-gray-700">
			<div className="mx-auto flex aspect-square items-center justify-center">
				<Image
					src={book.cover}
					height={150}
					width={150}
					alt={`${book.title} Cover`}
				/>
			</div>
			<div className="col-span-2 flex flex-col justify-center">
				<h1 className="mb-0 font-calsans text-lg font-bold">{title}</h1>
				<h2 className="text-bold mt-0 w-min whitespace-nowrap font-calsans text-sm text-gray-700">
					{author}
				</h2>
				<p className="mt-3 flex items-center text-xs">
					${price} / <AiFillStar className="ml-[2px]" />
					{rating}
				</p>
				<button
					className="mt-2 w-min text-xs text-gray-500 hover:underline"
					onClick={() => removeCallback(id)}
				>
					Remove
				</button>
			</div>
		</div>
	);
};

export default Cart;
