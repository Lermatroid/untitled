import { createTRPCRouter } from "~/server/api/trpc";
import { publicRouter } from "./routers/public";
import { adminRouter } from "./routers/admin";
import { authedRouter } from "./routers/authed";

/**
 * This is the primary router for your server.
 *
 * All routers added in /api/routers should be manually added here.
 */
export const appRouter = createTRPCRouter({
	public: publicRouter,
	admin: adminRouter,
	authed: authedRouter,
});

// export type definition of API
export type AppRouter = typeof appRouter;
