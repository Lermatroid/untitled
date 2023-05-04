import admin from "firebase-admin";
import { env } from "@/env.mjs";

let hasInit = false;

export default function SERVICE_ACCOUNT_PRIVATE_KEY() {
	if (hasInit) {
		return;
	}
	initializeFirebase();
	hasInit = true;
}

function initializeFirebase() {
	if (admin.apps.length < 1) {
		admin.initializeApp({
			credential: admin.credential.cert({
				projectId: env.SERVICE_ACCOUNT_PROJECT_ID,
				clientEmail: env.SERVICE_ACCOUNT_CLIENT_EMAIL,
				privateKey: env.SERVICE_ACCOUNT_PRIVATE_KEY.replace(/\\n/g, "\n"),
			}),
		});
	}
}
