import { type NextPage } from "next";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { initApp, refreshAccessTokenCookie } from "~/lib/firebase";
import { useForm } from "react-hook-form";
import Input from "~/components/shadcn/Input";
import { useRouter } from "next/router";
import useEffectOnce from "~/lib/useEffectOnce";
import { useAuth } from "~/components/auth/AuthContext";
import { api } from "~/utils/api";

interface registerFormItems {
	username: string;
	fullname: string;
	email: string;
	password: string;
}

const Login: NextPage = () => {
	const { register, handleSubmit } = useForm<registerFormItems>();
	const router = useRouter();
	const auth = getAuth(initApp());
	const authState = useAuth();

	const checkIfUsernameIsTaken =
		api.public.checkIfUsernameIsTaken.useMutation();
	const createUserData = api.authed.updateProfileInfo.useMutation();
	useEffectOnce(() => {
		if (authState?.currentUser) {
			alert("You are already logged in! Redirecting you to the account page.");
			router.push("/account");
		}
	});

	const handleDoRegister = async (data: registerFormItems) => {
		const checkIfUsernameIsTakenResponse =
			await checkIfUsernameIsTaken.mutateAsync(data.username);

		if (checkIfUsernameIsTakenResponse) {
			return alert(
				"That username is already taken! Please try a different one."
			);
		}

		if (
			data.fullname.length < 5 ||
			data.username.length < 5 ||
			data.password.length < 5 ||
			data.email.length < 3
		) {
			return alert(
				"Please make sure all fields are filled out correctly and that they meet the minimum length requirements of 5 characters!"
			);
		}

		createUserWithEmailAndPassword(auth, data.email, data.password)
			.then((userCredential) => {
				// Signed in
				const user = userCredential.user;
				console.log(user);
				refreshAccessTokenCookie(false);
				createUserData.mutateAsync({
					name: data.fullname,
					username: data.username,
				});
				alert("Account created! You are now signed in!");
				router.push("/login");
				// ...
			})
			.catch((error) => {
				const errorCode = error.code;
				const errorMessage = error.message;
				console.log(errorCode, errorMessage);
				alert("There was a error during account creation. Please try again!");
				// ..
			});
	};

	return (
		<main className="mx-auto min-h-screen w-full max-w-[1024px] pt-40">
			<h1 className="mb-10 font-calsans text-6xl font-black">Register</h1>
			<form onSubmit={handleSubmit((data) => handleDoRegister(data))}>
				<div className="flex-col gap-5">
					<div className="mb-2 max-w-[400px]">
						<label className="mb-1 font-calsans">Username</label>
						<Input {...register("username", { required: true })} />
					</div>
					<div className="mb-2 max-w-[400px]">
						<label className="mb-1 font-calsans">Full Name</label>
						<Input {...register("fullname", { required: true })} />
					</div>
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
					Register
				</button>
			</form>
		</main>
	);
};

export default Login;
