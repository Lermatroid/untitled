import BookHero from "~/components/item/BookHero";
import { prisma } from "~/server/db";
import { Book } from "~/lib/types";

const Book = async ({ params }: { params: { id: string } }) => {
	const book = await prisma.book.findUnique({
		where: {
			id: params.id,
		},
	});
	return (
		<>
			<BookHero {...(book as Book)} />
		</>
	);
};

export default Book;
