"use client";

import { type FunctionComponent } from "react";
import Image from "next/image";
import { Book } from "~/lib/types";
import { BsPencilSquare, BsFillBasket3Fill } from "react-icons/bs";
import Balancer from "react-wrap-balancer";
import { useCart } from "~/lib/cart";
import Link from "next/link";

const BookHero: FunctionComponent<Book> = (book) => {
	const { addBook } = useCart();
	const { cover, title, author, description, id, price, rating } = book;

	const handleAddToCart = () => {
		addBook(book);
		alert("Added to cart!");
	};

	return (
		<main className="mx-auto grid min-h-screen w-full max-w-[1024px] grid-cols-2 gap-2 pt-10">
			<div className="flex items-center justify-center pr-10">
				<div className="relative mx-auto aspect-[9/12] w-full overflow-hidden rounded-xl border-2 border-b-[6px] border-r-[6px] border-black">
					<Image src={cover} fill alt={`${title} Cover`} />
				</div>
			</div>
			<div className="flex flex-col justify-center">
				<h1 className="font-calsans text-6xl font-black">
					<Balancer>{title}</Balancer>
				</h1>
				<h2 className="text-bold mt-1 pl-1 font-calsans text-xl text-gray-700">
					{author}
				</h2>
				<p className="mt-5 font-bold">
					<Balancer>{description}</Balancer>
				</p>
				<button
					onClick={() => handleAddToCart()}
					className="mt-5 flex w-min min-w-[175px] items-center justify-center whitespace-nowrap rounded bg-black px-5 py-4 font-calsans font-bold text-white hover:bg-gray-950"
				>
					<BsFillBasket3Fill className="mr-2" />
					Add to Cart
				</button>
				<Link
					href={`/book/${id}/review`}
					className="mt-5 flex w-min min-w-[175px] items-center justify-center whitespace-nowrap rounded bg-black px-5 py-4 font-calsans font-bold text-white hover:bg-gray-950"
				>
					<BsPencilSquare className="mr-2" />
					Write a Review
				</Link>
			</div>
		</main>
	);
};

export default BookHero;
