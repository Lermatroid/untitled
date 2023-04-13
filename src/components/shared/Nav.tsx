import { type FunctionComponent } from "react";
import Link from "next/link";
import { BsFillBasket3Fill } from "react-icons/bs";
import { useCart } from "~/lib/cart";

const Nav: FunctionComponent = () => {
	const { cart } = useCart();
	return (
		<nav className="fixed z-10 w-screen">
			<div className="mx-auto mt-2 grid h-[75px] w-full max-w-[1024px] grid-cols-2 rounded-full border-2 border-b-4 border-black bg-white px-7 py-2">
				<div className="flex items-center">
					<Link href={"/"}>
						<h1 className="font-calsans text-2xl font-black">Untitled</h1>
					</Link>
				</div>
				<div className="text-md flex items-center justify-end font-sans font-bold">
					<Link href="/login" className="ml-3 underline">
						Login
					</Link>
					<Link href="/login" className="ml-3 underline">
						Contact
					</Link>
					<Link href="/login" className="ml-3 underline">
						About Us
					</Link>
					<Link
						href={"/cart"}
						className="ml-5 aspect-square rounded-full border-2 border-black bg-gray-100 p-3 text-center hover:bg-gray-200"
					>
						<BsFillBasket3Fill className="text-2xl" />
					</Link>
					{/* <button onClick={() => console.log(cart)}>Debug Log Cart</button> */}
				</div>
			</div>
		</nav>
	);
};

export default Nav;
