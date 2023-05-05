import superjson from "superjson";
import {
	type NextPage,
	type GetServerSidePropsContext,
	InferGetServerSidePropsType,
} from "next";
import { prisma } from "~/server/db";
import { Prisma } from "@prisma/client";
import Link from "next/link";
import Image from "next/image";

export const getServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const { query } = context;
	const searchQuery = query.q;
	if (searchQuery && typeof searchQuery == "string") {
		const results = await prisma.book.findMany({
			where: {
				OR: [
					{
						title: {
							contains: searchQuery as string,
							mode: "insensitive",
						},
					},
					{
						author: {
							contains: searchQuery as string,
							mode: "insensitive",
						},
					},
				],
			},
		});

		return {
			props: {
				results: superjson.stringify(results),
			},
		};
	} else {
		return {
			notFound: true,
		};
	}
};

type ssrProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const Search: NextPage<ssrProps> = ({ results }) => {
	const parsedResults = superjson.parse<Prisma.BookGetPayload<{}>[]>(results);
	return (
		<main className="mx-auto min-h-screen w-full max-w-[1024px] pt-40">
			<h1 className="mb-2 font-calsans text-6xl font-black">Results</h1>
			<h2>
				Showing {parsedResults.length} Book
				{parsedResults.length === 1 ? "" : "s"}
			</h2>
			<div className="mt-5 grid grid-cols-3 gap-2">
				{parsedResults.map((book) => (
					<ResultItem book={book} />
				))}
			</div>
		</main>
	);
};

const ResultItem = ({ book }: { book: Prisma.BookGetPayload<{}> }) => {
	const { title, cover, author, id } = book;
	return (
		<Link href={"/book/" + id}>
			<div className="relative aspect-[9/12] w-full overflow-hidden rounded-xl border-2 border-b-[6px] border-r-[6px] border-black">
				<Image src={cover} alt={"Cover For " + title} fill />
			</div>
			<h1 className="mt-1 pl-1 font-calsans text-xl">{title}</h1>
			<h2 className="pl-1 font-sans text-sm font-thin">{author}</h2>
		</Link>
	);
};

export default Search;
