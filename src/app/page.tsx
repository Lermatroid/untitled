import Hero from "~/components/landing/Hero";
import LandingSection from "~/components/landing/LandingSection";
import Footer from "~/components/shared/Footer";
import { get } from "@vercel/edge-config";
import { prisma } from "~/server/db";
import "cal-sans";

export const dynamic = "force-dynamic";

const Home = async () => {
	const books = await prisma.book.findMany();
	const featuredBooks = (await get("booksToFeature")) as string[];
	return (
		<>
			<Hero />
			<LandingSection
				title={"Popular"}
				books={books.filter((book) => featuredBooks.includes(book.id))}
			/>
			<LandingSection title={"Latest"} books={books} />
			<Footer />
		</>
	);
};

export default Home;
