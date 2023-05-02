import { type AppType } from "next/app";
import { api } from "~/utils/api";
import Nav from "~/components/shared/SCNav";
import "~/styles/globals.css";
import { calFont } from "~/fonts";

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<div className={`${calFont.variable}`}>
			<Nav />
			<Component {...pageProps} />
		</div>
	);
};

export default api.withTRPC(MyApp);
