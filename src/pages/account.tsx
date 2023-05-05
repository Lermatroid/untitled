import { type NextPage } from "next";
import { useRouter } from "next/router";
import useEffectOnce from "~/lib/useEffectOnce";
import { useAuth } from "~/components/auth/AuthContext";
import { api } from "~/utils/api";

const Account: NextPage = () => {
	const router = useRouter();
	const authState = useAuth();

	useEffectOnce(() => {
		if (!authState?.currentUser) {
			alert("You are not logged in! Redirecting you to the login page.");
			router.push("/login");
		}
	});

	const info = api.authed.getProfileInfo.useQuery();

	return (
		<main className="mx-auto min-h-screen w-full max-w-[1024px] pt-40">
			<h1 className="font-calsans text-2xl font-black text-gray-700">
				Welcome Back,
			</h1>
			<h1 className="mb-2 font-calsans text-8xl font-black">
				{info.data?.name.split(" ")[0]}
			</h1>
		</main>
	);
};

export default Account;
