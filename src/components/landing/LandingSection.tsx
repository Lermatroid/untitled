import { type FunctionComponent } from "react";
import { type Book } from "~/lib/types";
import Image from "next/image";
import Link from "next/link";

interface LandingSectionProps {
	title: string;
	books: Book[];
}

interface LandingItemProps extends Book {
	key: string;
}

const LandingSection: FunctionComponent<LandingSectionProps> = ({
	title,
	books,
}) => {
	return (
		<section className="mx-auto h-screen max-h-[700px] w-full max-w-[1024px]">
			<h1 className="mb-5 font-calsans text-3xl font-black">{title}</h1>
			<div className="grid w-full grid-cols-3 gap-2">
				{books.map((book) => {
					return <LandingItem {...book} key={book.title} />;
				})}
			</div>
		</section>
	);
};

const LandingItem: FunctionComponent<LandingItemProps> = ({
	title,
	coverImage,
	author,
	id,
}) => {
	return (
		<Link href={"/book/" + id}>
			<div className="relative aspect-[9/12] w-full overflow-hidden rounded-xl border-2 border-b-[6px] border-r-[6px] border-black">
				<Image src={coverImage} alt={"Cover For " + title} fill />
			</div>
			<h1 className="mt-1 pl-1 font-calsans text-xl">{title}</h1>
			<h2 className="pl-1 font-sans text-sm font-thin">{author}</h2>
		</Link>
	);
};

export default LandingSection;
