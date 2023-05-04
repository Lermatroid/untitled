import { type NextPage } from "next";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/router";
import { initApp } from "~/lib/firebase";
import { useForm } from "react-hook-form";
import Input from "~/components/shadcn/Input";
import Link from "next/link";

interface LoginFormItems {
	email: string;
	password: string;
}

const Login: NextPage = () => {
	const app = initApp();
	const auth = getAuth(app);
	const router = useRouter();
	const { register, handleSubmit } = useForm<LoginFormItems>();

	const handleDoSignin = async (data: LoginFormItems) => {
		const { email, password } = data;
		try {
			const res = await signInWithEmailAndPassword(auth, email, password);
			console.log(res);
			alert("Logged in! Redirecting you to the home page.");
			router.push("/");
		} catch (error) {
			console.log("Error during auth: ", error);
			alert(
				"Login failed. Please make sure you are using the proper username / password and have registered an account."
			);
		}
	};

	return (
		<main className="mx-auto min-h-screen w-full max-w-[1024px] pt-40">
			<h1 className="mb-10 font-calsans text-6xl font-black">Login</h1>
			<form onSubmit={handleSubmit((data) => handleDoSignin(data))}>
				<div className="flex-col gap-5">
					<div className="mb-2 max-w-[400px]">
						<label className="mb-1 font-calsans">Email</label>
						<Input {...register("email", { required: true })} />
					</div>
					<div className="mb-5 max-w-[400px]">
						<label className="mb-1 font-calsans">Password</label>
						<Input
							type="password"
							{...register("password", { required: true })}
						/>
					</div>
				</div>
				<button className="flex w-min min-w-[100px] items-center justify-center whitespace-nowrap rounded bg-black px-5 py-4 font-calsans font-bold text-white hover:bg-gray-950">
					Login
				</button>
			</form>
			<p className="mt-5 font-sans text-sm font-bold">
				Don't have an account yet? Go ahead and{" "}
				<Link href={"/register"} className="text-blue-500 underline">
					register here
				</Link>
				.
			</p>
		</main>
	);
};

export default Login;
