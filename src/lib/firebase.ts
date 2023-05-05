// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";
import { setCookie, deleteCookie } from "cookies-next";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "AIzaSyDyCT9ZetHPOMTuklyZgqKRGYlEFreQSOs",
	authDomain: "untitled-206f5.firebaseapp.com",
	projectId: "untitled-206f5",
	storageBucket: "untitled-206f5.appspot.com",
	messagingSenderId: "68750519263",
	appId: "1:68750519263:web:574ab98f16f51a8d5af26a",
	measurementId: "G-T589JJYW5Y",
};

export const initApp = () => {
	if (getApps().length < 1) {
		return initializeApp(firebaseConfig);
	}
	if (getApps().length > 0) {
		return getApps()[0];
	}
};

export const refreshAccessTokenCookie = async (doLoginRedir = true) => {
	const auth = getAuth(initApp());
	const user = auth.currentUser;
	if (user) {
		const token = await user.getIdToken();
		setCookie("fbToken", token);
		return true;
	} else {
		console.error("Erorr when refreshing access token cookie: no user found.");
		return false;
	}
};

export const doSignout = async () => {
	const auth = getAuth(initApp());
	deleteCookie("fbToken");
	await auth.signOut();
	location.reload();
};
