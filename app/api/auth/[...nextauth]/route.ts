import NextAuth, { NextAuthOptions, DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

const clientId = process.env.GOOGLE_CLIENT_ID;
const clientSecret = process.env.GOOGLE_CLIENT_SECRET;

if (!clientId || !clientSecret) {
	throw new Error("Google OAuth environment variables are not set properly");
}

const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [GoogleProvider({ clientId, clientSecret })],
	session: {
		strategy: "database",
	},
	callbacks: {
		async session({
			session,
			user,
		}: {
			session: DefaultSession;
			user: any;
		}) {
			return {
				...session,
				user: {
					...session.user,
					id: user.id.toString(),
					isAdmin: Boolean(user.isAdmin),
				} as DefaultSession["user"] & { id: string; isAdmin: boolean },
			};
		},
	},
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
