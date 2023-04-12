import { type FunctionComponent } from "react";
import Image from "next/image";
import Link from "next/link";

const Footer: FunctionComponent = () => {
	return (
		<div className="min-h-[600px] w-full overflow-hidden bg-black">
			<div className="mx-auto grid h-full min-h-[600px] w-full max-w-[1024px] grid-cols-2">
				<div className="relative flex h-full flex-col p-10">
					<h1 className="font-calsans text-6xl font-black text-white">
						Untitled
					</h1>
					<Link
						href="/about"
						className="mt-2 font-calsans text-xl text-white underline"
					>
						About
					</Link>
					<Link
						href="/contact"
						className="mt-1 font-calsans text-xl text-white underline"
					>
						Contact
					</Link>
					<Link
						href="/contact"
						className="mt-1 font-calsans text-xl text-white underline"
					>
						Open Source
					</Link>
					<p className="absolute bottom-0 mb-10 font-sans text-white">
						© Untitled Bookstore 2023. All rights reserved.
					</p>
				</div>
				<div className="relative h-full">
					<Image
						src={"/img/bookshelf.png"}
						alt="Bookshelf"
						className="mr-5 mt-5 invert"
						fill
					/>
				</div>
			</div>
		</div>
	);
};

export default Footer;
