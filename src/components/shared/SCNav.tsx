"use client";

import { type FunctionComponent, useState } from "react";
import Link from "next/link";
import { BsFillBasket3Fill } from "react-icons/bs";
import { FaSearch } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import AuthProvider from "../auth/AuthProvider";
import { useAuth } from "../auth/AuthContext";
import { BsPersonCircle } from "react-icons/bs";

const Nav: FunctionComponent = () => {
	const [searchBarValue, setSearchBarValue] = useState("");
	const router = useRouter();
	const { handleSubmit } = useForm();
	const searchParams = useSearchParams();

	const handleSearch = () => {
		if (searchBarValue.length > 0) {
			router.push(`/search?q=${encodeURIComponent(searchBarValue)}`);
		}
	};

	return (
		<nav className="fixed z-10 w-screen text-black">
			<div className="mx-auto mt-2 grid h-[75px] w-full max-w-[1024px] grid-cols-4 rounded-full border-2 border-b-4 border-black bg-white px-7 py-2">
				<div className="flex items-center">
					<Link href={"/"}>
						<h1 className="font-calsans text-2xl font-black">Untitled</h1>
					</Link>
				</div>
				<form
					onSubmit={handleSubmit(() => handleSearch)}
					className="text-md col-span-2 flex items-center justify-center overflow-hidden rounded-full font-sans font-bold focus-within:border focus-within:border-blue-500"
				>
					<input
						onChange={(e) => setSearchBarValue(e.target.value)}
						defaultValue={
							searchParams?.has("q") ? (searchParams.get("q") as string) : ""
						}
						placeholder="A Incredible New Story..."
						className="h-full w-[90%] rounded-l-full border-2 border-black  p-3 text-left outline-none"
						id="searchBar"
					/>
					<button
						onClick={() => handleSearch()}
						className="h-full w-[10%] rounded-r-full border-2 border-l-0 border-black bg-gray-100 p-3 text-left hover:bg-gray-200"
					>
						<FaSearch />
					</button>
				</form>
				<div className="text-md flex items-center justify-end font-sans font-bold">
					<AuthProvider>
						<LoginButton />
					</AuthProvider>
					<Link
						href={"/cart"}
						className="ml-2 aspect-square h-full rounded-full border-2 border-black bg-gray-100 p-3 text-center hover:bg-gray-200"
					>
						<BsFillBasket3Fill className="text-2xl" />
					</Link>
					{/* <button onClick={() => console.log(cart)}>Debug Log Cart</button> */}
				</div>
			</div>
		</nav>
	);
};

const LoginButton: FunctionComponent = () => {
	const auth = useAuth();
	if (auth?.currentUser) {
		return (
			<Link
				href={"/account"}
				className="ml-2 aspect-square h-full rounded-full border-2 border-black bg-gray-100 p-3 text-center hover:bg-gray-200"
			>
				<BsPersonCircle className="text-2xl" />
			</Link>
		);
	} else {
		return (
			<Link
				href="/login"
				className="ml-5 h-full rounded-full border-2 border-black bg-gray-100 p-3 text-center hover:bg-gray-200"
			>
				Login
			</Link>
		);
	}
};

export default Nav;
