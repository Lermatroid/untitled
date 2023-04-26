import { type NextPage } from "next";
import { type FunctionComponent, useState } from "react";
import { useForm } from "react-hook-form";
import Input from "@/components/shadcn/Input";
import Textarea from "~/components/shadcn/Textarea";
import { AiFillPlusCircle } from "react-icons/ai";
import { BiLogOut } from "react-icons/bi";
import { deleteCookie } from "cookies-next";
import { api } from "~/utils/api";

interface AdminSectionProps {
	title: string;
	children?: JSX.Element | JSX.Element[];
}

const Admin: NextPage = () => {
	const handleLogout = () => {
		deleteCookie("admin_uname");
		deleteCookie("admin_pass");
		window.location.reload();
	};

	return (
		<main className="mx-auto min-h-screen w-full max-w-[1024px] pt-40">
			<div className="relative mb-2 flex items-center justify-start border-b-[6px] border-b-black">
				<h1 className="font-calsans text-6xl font-black">Admin Panel</h1>
				<button
					onClick={() => handleLogout()}
					className="absolute right-0 flex w-min items-center whitespace-nowrap rounded bg-black px-5 py-4 font-calsans font-bold text-white hover:bg-gray-950"
				>
					<BiLogOut className="mr-1 text-xl" />
					Log Out
				</button>
			</div>
			<AdminSection title="Add Books">
				<AddBookForm />
			</AdminSection>
			<hr className="mt-10" />
			<AdminSection title="Featured Books">
				<FeaturedBooksSection />
			</AdminSection>
		</main>
	);
};

const AdminSection: FunctionComponent<AdminSectionProps> = ({
	title,
	children,
}) => {
	return (
		<div className="mx-auto mt-10 max-w-[1024px] overflow-x-hidden">
			<h2 className="mb-5 font-calsans text-3xl font-bold">{title}</h2>
			{children ? children : null}
		</div>
	);
};

const AddBookForm: FunctionComponent = () => {
	const addBook = api.admin.addBook.useMutation();

	interface FormData {
		bookTitle: string;
		bookAuthor: string;
		bookPrice: number;
		bookRating: number;
		bookCover: string;
		bookDesc: string;
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<FormData>();

	const handleAddBook = async (data: FormData) => {
		console.log(data);
		const res = await addBook.mutateAsync({
			title: data.bookTitle,
			author: data.bookAuthor,
			price: data.bookPrice,
			rating: data.bookRating,
			coverImage: data.bookCover,
			description: data.bookDesc,
		});
		alert("Book added successfully!");
		window.open(`/book/${res.id}`, "_blank");
	};

	return (
		<form
			className="flex w-full max-w-[1024px] flex-wrap justify-stretch gap-5 p-1"
			onSubmit={handleSubmit(handleAddBook)}
		>
			<div>
				<label className="font-calsans">Title</label>
				<Input className="min-w-[400px]" {...register("bookTitle")} />
			</div>
			<div>
				<label className="font-calsans">Book Author</label>
				<Input className="min-w-[400px]" {...register("bookAuthor")} />
			</div>
			<div>
				<label className="font-calsans">Price (USD)</label>
				<Input
					type="number"
					step="any"
					className="w-screen max-w-[190px]"
					{...register("bookPrice", { valueAsNumber: true, required: true })}
				/>
			</div>
			<div>
				<label className="font-calsans">Rating (Scale of 1 to 5)</label>
				<Input
					type="number"
					step="any"
					className="w-screen max-w-[190px]"
					{...register("bookRating", { valueAsNumber: true, required: true })}
				/>
			</div>
			<div>
				<label className="font-calsans">
					Book Cover (Wikimedia Image URL)*
				</label>
				<Input className="w-screen max-w-[400px]" {...register("bookCover")} />
			</div>
			<div className="w-full">
				<label className="font-calsans">Description</label>
				<Textarea className="w-full" {...register("bookDesc")} />
			</div>
			<div className="w-full">
				<button className="flex w-min items-center whitespace-nowrap rounded bg-black px-5 py-4 font-calsans font-bold text-white hover:bg-gray-950">
					<AiFillPlusCircle className="mr-1 text-xl" />
					Add Book
				</button>
			</div>
			<p className="max-w-[400px] text-xs">
				* We only allow wikimedia hosted covers images to ensure that creative
				commons is met. You can tell a image is from wikimedia when its URL
				beings with upload.wikimedia.org.
			</p>
		</form>
	);
};

const FeaturedBooksSection: FunctionComponent = () => {
	const [featured, setFeatured] = useState("");
	return (
		<div className="p-1">
			<p className="text-md font-calsans">Featued Book IDs</p>
			<Input onChange={(e) => setFeatured(e.target.value)} className="w-full" />
			<p className="mt-2 max-w-[500px] text-xs">
				Book IDs should be seperated by commas with no spaces. For example:
				1,2,3,4,5
			</p>
			<button className="mt-5 flex w-min items-center whitespace-nowrap rounded bg-black px-5 py-4 font-calsans font-bold text-white hover:bg-gray-950">
				<AiFillPlusCircle className="mr-1 text-xl" />
				Set Featured Books
			</button>
		</div>
	);
};

export default Admin;
