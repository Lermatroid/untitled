import { type NextPage } from "next";
import Hero from "~/components/landing/Hero";
import Nav from "~/components/shared/Nav";
import LandingSection from "~/components/landing/LandingSection";
import Footer from "~/components/shared/Footer";
import { books } from "~/sampleData";

const Home: NextPage = () => {
	const booksArr = Object.values(books);
	return (
		<>
			<Hero />
			<LandingSection title={"Popular"} books={booksArr} />
			<LandingSection title={"Latest"} books={booksArr} />
			<Footer />
		</>
	);
};

export default Home;
