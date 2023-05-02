import superjson from "superjson";
import {
	type NextPage,
	type GetServerSidePropsContext,
	InferGetServerSidePropsType,
} from "next";
import { prisma } from "~/server/db";
import { Prisma } from "@prisma/client";
import { parse } from "path";

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
		</main>
	);
};

export default Search;
