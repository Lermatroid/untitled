import { type Book } from "./lib/types";

export const books: { [key: string]: Book } = {
	axydc43: {
		id: "axydc43",
		title: "To Kill a Mockingbird",
		description:
			"Harper Lee's Pulitzer Prize-winning masterwork of honor and injustice in the deep South—and the heroism of one man in the face of blind and violent hatred",
		author: "Harper Lee",
		price: 9.99,
		rating: 4.9,
		coverImage:
			"https://upload.wikimedia.org/wikipedia/commons/4/4f/To_Kill_a_Mockingbird_%28first_edition_cover%29.jpg",
	},
	"54bn5ty": {
		id: "54bn5ty",
		title: "The Great Gatsby",
		description:
			"The Great Gatsby is considered F. Scott Fitzgerald’s magnum opus, exploring themes of decadence, idealism, social stigmas, patriarchal norms, and the deleterious effects of unencumbered wealth in capitalistic society, set against the backdrop of the Jazz Age and the Roaring Twenties. At its heart, it’s a cautionary tale, a revealing look into the darker side to the American Dream.",
		author: "F. Scott Fitzgerald",
		price: 4.99,
		rating: 4.5,
		coverImage:
			"https://upload.wikimedia.org/wikipedia/commons/7/7a/The_Great_Gatsby_Cover_1925_Retouched.jpg",
	},
	ty74hj9: {
		id: "ty74hj9",
		title: "The Catcher in the Rye",
		description:
			"Anyone who has read J.D. Salinger's New Yorker stories--particularly A Perfect Day for Bananafish, Uncle Wiggily in Connecticut, The Laughing Man, and For Esme With Love and Squalor--will not be surprised by the fact that his first novel is full of children. The hero-narrator of The Catcher in the Rye is an ancient child of sixteen, a native New Yorker named Holden Caulfield. Through circumstances that tend to preclude adult, secondhand description, he leaves his prep school in Pennsylvania and goes underground in New York City for three days. The boy himself is at once too simple and too complex for us to make any final comment about him or his story. Perhaps the safest thing we can say about Holden is that he was born in the world not just strongly attracted to beauty but, almost, hopelessly impaled on it.",
		author: "J.D. Salinger",
		price: 5.99,
		rating: 4.7,
		coverImage:
			"https://upload.wikimedia.org/wikipedia/commons/thumb/8/89/The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg/440px-The_Catcher_in_the_Rye_%281951%2C_first_edition_cover%29.jpg",
	},
};
