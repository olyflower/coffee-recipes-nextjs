import NextAuth, { NextAuthOptions, DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions = {
	adapter: PrismaAdapter(prisma),
	providers: [
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID!,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
		}),
	],
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
