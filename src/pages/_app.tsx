import { type AppType } from "next/app";
import { api } from "~/utils/api";
import Nav from "~/components/shared/SCNav";
import "~/styles/globals.css";
import { calFont } from "~/fonts";
import AuthProvider from "~/components/auth/AuthProvider";

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<AuthProvider>
			<div className={`${calFont.variable}`}>
				<Nav />
				<Component {...pageProps} />
			</div>
		</AuthProvider>
	);
};

export default api.withTRPC(MyApp);
