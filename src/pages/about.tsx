import { type NextPage } from "next";
import {
	BsArrowDownCircleFill,
	BsArrowRightCircleFill,
	BsFillArrowRightCircleFill,
} from "react-icons/bs";
import Link from "next/link";
import Footer from "~/components/shared/Footer";

const About: NextPage = () => {
	return (
		<>
			<main className="relative flex min-h-screen flex-col items-center justify-center bg-black pt-20 text-white">
				<div className="-translate-y-20">
					<h1 className="font-calsans text-6xl font-black">Who are we?</h1>
					<h1 className="font-calsans text-6xl font-black opacity-80">
						Who are we?
					</h1>
					<h1 className="font-calsans text-6xl font-black opacity-60">
						Who are we?
					</h1>
					<h1 className="font-calsans text-6xl font-black opacity-40">
						Who are we?
					</h1>
					<h1 className="font-calsans text-6xl font-black opacity-20">
						Who are we?
					</h1>
				</div>
				<BsArrowDownCircleFill className="absolute bottom-0 mb-10 animate-bounce text-6xl" />
			</main>
			<section className="flex min-h-screen flex-col items-center justify-center">
				<h2 className="pt-40 text-center font-mono">We Are</h2>
				<h1 className="text-center font-calsans text-9xl font-black ">
					Untitled
				</h1>
				<p className="mt-32 text-center font-mono text-xl">
					We make books <b>better</b>
					<br />
					by making the browsing and purchasing experience
					<br />
					<b className="text-2xl">
						<i>as simple as can be</i>
					</b>
					.
				</p>
				<Link
					href="/"
					className="mx-auto mt-7 flex w-min items-center whitespace-nowrap rounded bg-black px-5 py-4 font-calsans font-bold text-white hover:bg-gray-950"
				>
					Try it now <BsArrowRightCircleFill className="ml-2" />
				</Link>
			</section>
			<section className="flex min-h-screen flex-col items-center justify-center">
				<h1 className="border-b-2 border-dashed border-black font-calsans text-3xl font-black">
					Running Into An Issue?
				</h1>
				<Link
					href={"/contact"}
					className="mt-5 flex w-min flex-nowrap items-center whitespace-nowrap rounded-full bg-black p-1 px-2 text-sm text-white"
				>
					Contact Us <BsFillArrowRightCircleFill className="ml-1" />
				</Link>
			</section>
			<Footer />
		</>
	);
};

export default About;
