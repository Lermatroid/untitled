import { type NextPage, type InferGetServerSidePropsType } from "next";
import Textarea from "~/components/shadcn/Textarea";
import Input from "~/components/shadcn/Input";
import { useState } from "react";
import { prisma } from "~/server/db";
import { BsFillStarFill } from "react-icons/bs";
import { api } from "~/utils/api";
import { useAuth } from "~/components/auth/AuthContext";
import useEffectOnce from "~/lib/useEffectOnce";
import { useRouter } from "next/router";

export async function getServerSideProps({
	params,
}: {
	params: { id: string };
}) {
	const book = await prisma.book.findUnique({
		where: {
			id: params.id,
		},
	});
	if (book) {
		return {
			props: {
				id: params.id,
				title: book?.title,
			},
		};
	} else {
		return {
			notFound: true,
		};
	}
}

type SSRRtype = InferGetServerSidePropsType<typeof getServerSideProps>;

const Review: NextPage<SSRRtype> = ({ id, title }) => {
	const [review, setReview] = useState("");
	const [reviewTitle, setReviewTitle] = useState("");
	const [rating, setRating] = useState(4);

	const router = useRouter();
	const auth = useAuth();

	useEffectOnce(() => {
		if (!auth?.currentUser) {
			alert("You must be logged in to post a review!");
			router.push("/login");
		}
	});

	const postReview = api.authed.createReview.useMutation();

	const handleDoPostReview = async () => {
		if (review.length < 1 || reviewTitle.length < 1) {
			return alert("Please fill out all fields before posting your review.");
		}

		try {
			await postReview.mutateAsync({
				body: review,
				title: reviewTitle,
				rating: rating,
				bookID: id,
			});
			alert("Review posted!");
			router.push(`/book/${id}`);
		} catch (e) {
			console.log(e);
			alert("There was an error posting your review. Please try again.");
		}
	};

	return (
		<main className="mx-auto min-h-screen w-full max-w-[1024px] pt-40">
			<h1 className="font-calsans text-2xl font-black text-gray-700">
				New Review
			</h1>
			<h1 className="mb-10 font-calsans text-6xl font-black">{title}</h1>
			<Input
				className="mb-2"
				onChange={(e) => setReviewTitle(e.target.value)}
				placeholder={`My Thoughts on ${title}`}
			/>
			<Textarea
				placeholder="I just finished reading this book and I have to say..."
				onChange={(e) => setReview(e.target.value)}
			/>
			<div className="mt-5 flex items-center gap-2 text-3xl">
				<button onClick={() => setRating(1)}>
					<BsFillStarFill
						className={`${rating >= 1 ? "text-yellow-500" : ""}`}
					/>
				</button>
				<button onClick={() => setRating(2)}>
					<BsFillStarFill
						className={`${rating >= 2 ? "text-yellow-500" : ""}`}
					/>
				</button>
				<button onClick={() => setRating(3)}>
					<BsFillStarFill
						className={`${rating >= 3 ? "text-yellow-500" : ""}`}
					/>
				</button>
				<button onClick={() => setRating(4)}>
					<BsFillStarFill
						className={`${rating >= 4 ? "text-yellow-500" : ""}`}
					/>
				</button>
				<button onClick={() => setRating(5)}>
					<BsFillStarFill
						className={`${rating >= 5 ? "text-yellow-500" : ""}`}
					/>
				</button>
			</div>
			<button
				onClick={() => handleDoPostReview()}
				className="mt-14 flex w-min min-w-[100px] items-center justify-center whitespace-nowrap rounded bg-black px-5 py-4 font-calsans font-bold text-white hover:bg-gray-950"
			>
				Post Review
			</button>
		</main>
	);
};

export default Review;
