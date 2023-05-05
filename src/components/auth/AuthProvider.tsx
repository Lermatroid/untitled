"use client";

import { useState, useEffect, type FunctionComponent } from "react";
import { getAuth, type User } from "firebase/auth";
import { initApp, refreshAccessTokenCookie } from "~/lib/firebase";
import AuthContext from "./AuthContext";

interface AuthProviderProps {
	children: JSX.Element | JSX.Element[];
}

const AuthProvider: FunctionComponent<AuthProviderProps> = ({ children }) => {
	const [currentUser, setCurrentUser] = useState<null | User>(null);
	const [loading, setLoading] = useState(true);
	const auth = getAuth(initApp());

	useEffect(() => {
		const unsubscribeStateChange = auth.onAuthStateChanged((user) => {
			setCurrentUser(user);
			if (user) {
				refreshAccessTokenCookie(false);
			}
			setLoading(false);
		});

		const unsubscribeTokenChange = auth.onIdTokenChanged(async (user) => {
			if (user) {
				refreshAccessTokenCookie(false);
			}
		});

		const unsubscribe = () => {
			unsubscribeStateChange();
			unsubscribeTokenChange();
		};

		return () => unsubscribe();
	}, []);

	return (
		<AuthContext.Provider value={{ currentUser }}>
			{!loading && children}
		</AuthContext.Provider>
	);
};

export default AuthProvider;
