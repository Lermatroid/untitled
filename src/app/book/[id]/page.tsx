import BookHero from "~/components/item/BookHero";
import { prisma } from "~/server/db";
import { Book } from "~/lib/types";
import { FunctionComponent } from "react";
import Balancer from "react-wrap-balancer";
import { BsFillStarFill } from "react-icons/bs";

interface reviewListingProps {
	title: string;
	rating: number;
	body: string;
	author: string;
}

const Book = async ({ params }: { params: { id: string } }) => {
	const book = await prisma.book.findUnique({
		where: {
			id: params.id,
		},
	});
	const reviews = await prisma.review.findMany({
		where: {
			bookID: params.id,
		},
	});
	return (
		<>
			<BookHero {...(book as Book)} />
			<section className="mx-auto min-h-screen w-full max-w-[1024px]">
				<h2 className="mb-5 font-calsans text-6xl font-black">Reviews</h2>
				{reviews.map((review) => (
					<ReviewListing
						title={review.title}
						rating={review.rating}
						body={review.body}
						author={review.authorName}
					/>
				))}
			</section>
		</>
	);
};

const ReviewListing: FunctionComponent<reviewListingProps> = ({
	title,
	rating,
	body,
	author,
}) => {
	return (
		<div className="mb-2 rounded-xl border-2 border-b-4 border-black p-5">
			<h1 className="font-calsans text-xl font-black">{title}</h1>
			<h2 className="mb-5 font-calsans text-sm text-gray-500">By @{author}</h2>
			<Balancer className="text-md font-bold">
				<p>{body}</p>
			</Balancer>
			<StarListing rating={rating} />
		</div>
	);
};

const StarListing: FunctionComponent<{ rating: number }> = ({ rating }) => {
	return (
		<div className="mt-5 flex items-center gap-2 text-3xl">
			<BsFillStarFill className={`${rating >= 1 ? "text-yellow-500" : ""}`} />

			<BsFillStarFill className={`${rating >= 2 ? "text-yellow-500" : ""}`} />

			<BsFillStarFill className={`${rating >= 3 ? "text-yellow-500" : ""}`} />

			<BsFillStarFill className={`${rating >= 4 ? "text-yellow-500" : ""}`} />

			<BsFillStarFill className={`${rating >= 5 ? "text-yellow-500" : ""}`} />
		</div>
	);
};

export default Book;
