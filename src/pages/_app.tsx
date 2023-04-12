import { type AppType } from "next/app";
import "cal-sans";
import { api } from "~/utils/api";
import Nav from "~/components/shared/Nav";
import "~/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
	return (
		<>
			<Nav />
			<Component {...pageProps} />
		</>
	);
};

export default api.withTRPC(MyApp);
