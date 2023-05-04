import { type NextPage } from "next";
import {
	BsArrowDownCircleFill,
	BsArrowRightCircleFill,
	BsFillArrowRightCircleFill,
} from "react-icons/bs";
import Link from "next/link";
import Footer from "~/components/shared/Footer";

const Contact: NextPage = () => {
	return (
		<>
			<main className="flex min-h-screen flex-col items-center justify-center">
				<h2 className="pt-40 text-center font-mono">We Are</h2>
				<h1 className="text-center font-calsans text-9xl font-black ">
					Untitled
				</h1>
				<p className="mt-32 text-center font-mono text-xl">
					Have a question?{" "}
					<b className="border-b-2 border-dashed border-b-black">
						<i>Get in touch.</i>
					</b>
				</p>
				<div className="mt-10 flex overflow-hidden rounded">
					<input
						className="w-[250px] border-y-2 border-l-2 border-dashed border-black p-2 text-center font-sans font-bold"
						value={"hello@untitledbookstore.xyz"}
						readOnly
					/>
					<button
						onClick={() =>
							navigator.clipboard
								.writeText("hello@untitledbookstore.xyz")
								.then(() => alert("Copied to Clipboard!"))
						}
						className="bg-black p-2 px-4 font-sans font-bold text-white"
					>
						Copy
					</button>
				</div>
			</main>
			<Footer />
		</>
	);
};

export default Contact;
