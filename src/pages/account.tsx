import { type NextPage } from "next";
import { useRouter } from "next/router";
import useEffectOnce from "~/lib/useEffectOnce";
import { useAuth } from "~/components/auth/AuthContext";
import { api } from "~/utils/api";
import { type FunctionComponent } from "react";
import { GoSignOut } from "react-icons/go";
import { doSignout } from "~/lib/firebase";
import Balancer from "react-wrap-balancer";
import { BsFillStarFill } from "react-icons/bs";

interface reviewListingProps {
	title: string;
	rating: number;
	body: string;
	author: string;
}

const Account: NextPage = () => {
	const router = useRouter();
	const authState = useAuth();

	useEffectOnce(() => {
		if (!authState?.currentUser) {
			alert("You are not logged in! Redirecting you to the login page.");
			router.push("/login");
		}
	});

	const info = api.authed.getProfileInfo.useQuery();
	const reviews = api.authed.myReviews.useQuery();

	return (
		<>
			<main className="mx-auto mb-40 w-full max-w-[1024px] border-b-2 border-b-black pb-2 pt-40">
				<div className="grid grid-cols-3">
					<div className="col-span-2">
						<h1 className="font-calsans text-2xl font-black text-gray-700">
							Welcome Back,
						</h1>
						<h1 className="mb-2 font-calsans text-8xl font-black">
							{info.data?.name.split(" ")[0]}
						</h1>
					</div>
					<div className="relative h-full">
						<button
							onClick={() => doSignout()}
							className="absolute bottom-0 right-0 flex w-min items-center justify-center whitespace-nowrap rounded bg-black px-5 py-4 font-calsans font-bold text-white hover:bg-gray-950"
						>
							<GoSignOut className="mr-2" />
							Sign Out
						</button>
					</div>
				</div>
			</main>
			<section className="mx-auto mt-10 min-h-screen w-full max-w-[1024px]">
				<h2 className="mb-10 font-calsans text-6xl font-black">My Reviews</h2>
				{reviews.data ? (
					reviews.data.length > 0 ? (
						reviews.data.map((data) => (
							<ReviewListing
								title={data.title}
								rating={data.rating}
								body={data.body}
								author={data.authorName}
							/>
						))
					) : (
						<h1 className="font-calsans text-2xl font-black text-gray-700">
							No reviews yet, go write one to have it show up here!
						</h1>
					)
				) : (
					<h1 className="font-calsans text-2xl font-black text-gray-700">
						No reviews yet, go write one to have it show up here!
					</h1>
				)}
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

export default Account;
