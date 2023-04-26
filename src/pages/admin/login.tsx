import { type NextPage } from "next";
import { useState } from "react";
import { api } from "~/utils/api";
import Input from "~/components/shadcn/Input";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";

const Login: NextPage = () => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");

	const validateLogin = api.public.validateLogin.useMutation();
	const router = useRouter();

	const handleLoginSubmit = async () => {
		if (username.length < 1 && password.length < 1) {
			alert("Please enter a username and password!");
		} else {
			let isValidLogin = await validateLogin.mutateAsync({
				username,
				password,
			});
			if (isValidLogin) {
				setCookie("admin_uname", username);
				setCookie("admin_pass", password);
				alert("Success! You will be redirected to the admin panel.");
				router.push("/admin");
			} else {
				alert("Invalid username or password! Please try again.");
			}
		}
	};

	return (
		<main className="mx-auto min-h-screen w-full max-w-[1024px] pt-40">
			<h1 className="mb-10 font-calsans text-6xl font-black">Admin Login</h1>
			<div className="flex-col gap-5">
				<div className="mb-2 max-w-[400px]">
					<label className="mb-1 font-calsans">Username</label>
					<Input onChange={(e) => setUsername(e.target.value)} />
				</div>
				<div className="mb-5 max-w-[400px]">
					<label className="mb-1 font-calsans">Password</label>
					<Input
						onChange={(e) => setPassword(e.target.value)}
						type="password"
					/>
				</div>
			</div>
			<button
				onClick={() => handleLoginSubmit()}
				className="flex w-min min-w-[100px] items-center justify-center whitespace-nowrap rounded bg-black px-5 py-4 font-calsans font-bold text-white hover:bg-gray-950"
			>
				Login
			</button>
		</main>
	);
};

export default Login;
