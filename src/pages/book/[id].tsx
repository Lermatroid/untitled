import {
	type NextPage,
	type GetServerSideProps,
	type GetServerSidePropsResult,
} from "next";
import { books } from "~/sampleData";
import { type Book } from "~/lib/types";
import BookHero from "~/components/item/BookHero";

interface BookViewProps {
	book: Book;
}

const BookView: NextPage<BookViewProps> = ({ book }) => {
	return (
		<>
			<BookHero {...book} />
		</>
	);
};

export const getServerSideProps: GetServerSideProps<BookViewProps> = async (
	context
) => {
	if (context.params?.id && books[context.params.id as string]) {
		return {
			props: {
				book: books[context.params.id as string] as Book,
			},
		};
	} else {
		return {
			notFound: true,
		};
	}
};

export default BookView;
