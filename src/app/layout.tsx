import { type ReactNode } from "react";
import "../styles/globals.css";
import Nav from "~/components/shared/SCNav";
import { calFont } from "~/fonts";

export default function RootLayout({ children }: { children: ReactNode }) {
	return (
		<html lang="en" className={`${calFont.variable}`}>
			<head>
				<title>Untitled</title>
			</head>
			<body>
				<Nav />
				{children}
			</body>
		</html>
	);
}
