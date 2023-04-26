import { NextResponse, type NextRequest } from "next/server";
import { env } from "~/env.mjs";

export function middleware(req: NextRequest) {
	if (req.nextUrl.pathname.startsWith("/admin")) {
		if (
			req.cookies.get("admin_uname")?.value === env.ADMIN_UNAME &&
			req.cookies.get("admin_pass")?.value === env.ADMIN_PASS
		) {
			return NextResponse.next();
		} else {
			return NextResponse.redirect(new URL("/admin/login", req.url));
		}
	}
}

export const config = {
	matcher: ["/admin"],
};
