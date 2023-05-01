// import {
// 	type NextPage,
// 	type GetServerSideProps,
// 	type GetServerSidePropsResult,
// } from "next";
// import { type Book } from "~/lib/types";
// import BookHero from "~/components/item/BookHero";
// import { prisma } from "~/server/db";
// import { Prisma } from "@prisma/client";

// interface BookViewProps {
// 	book: Prisma.BookGetPayload;
// }

// const BookView: NextPage<BookViewProps> = ({ book }) => {
// 	return (
// 		<>
// 			<BookHero {...book} />
// 		</>
// 	);
// };

// export const getServerSideProps: GetServerSideProps<BookViewProps> = async (
// 	context
// ) => {
// 	if (context.params?.id) {
// 		const book = await prisma.book.findUnique({
// 			where: {
// 				id: context.params?.id as string,
// 			},
// 		});
// 		return {
// 			props: {
// 				book: book,
// 			},
// 		};
// 	} else {
// 		return {
// 			notFound: true,
// 		};
// 	}
// };

// export default BookView;
