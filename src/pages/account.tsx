import { type NextPage } from "next";
import { useRouter } from "next/router";
import useEffectOnce from "~/lib/useEffectOnce";
import { useAuth } from "~/components/auth/AuthContext";
import { api } from "~/utils/api";
import { GoSignOut } from "react-icons/go";
import { doSignout } from "~/lib/firebase";

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
			<div className="grid grid-cols-3">
				<div className="col-span-2">
					<h1 className="font-calsans text-2xl font-black text-gray-700">
						Welcome Back,
					</h1>
					<h1 className="mb-2 font-calsans text-8xl font-black">
						{info.data?.name.split(" ")[0]}
					</h1>
				</div>
				<div className="relative h-full">
					<button
						onClick={() => doSignout()}
						className="absolute bottom-0 right-0 flex w-min items-center justify-center whitespace-nowrap rounded bg-black px-5 py-4 font-calsans font-bold text-white hover:bg-gray-950"
					>
						<GoSignOut className="mr-2" />
						Sign Out
					</button>
				</div>
			</div>
		</main>
	);
};

export default Account;
