import { type NextPage } from "next";
import { useRouter } from "next/router";
import useEffectOnce from "~/lib/useEffectOnce";
import { useAuth } from "~/components/auth/AuthContext";

const Account: NextPage = () => {
	const router = useRouter();
	const authState = useAuth();

	useEffectOnce(() => {
		if (!authState?.currentUser) {
			alert("You are not logged in! Redirecting you to the login page.");
			router.push("/login");
		}
	});
	return (
		<main className="mx-auto min-h-screen w-full max-w-[1024px] pt-40">
			<h1 className="mb-2 font-calsans text-6xl font-black">Account</h1>
		</main>
	);
};

export default Account;
