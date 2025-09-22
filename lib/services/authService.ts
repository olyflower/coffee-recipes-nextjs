import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { prisma } from "@/lib/prisma";

export async function getSession() {
	try {
		const session = await getServerSession(authOptions);
		return session || null;
	} catch (error) {
		console.error("Failed to get session:", error);
		return null;
	}
}

export async function getCurrentUser() {
	const session = await getServerSession(authOptions);
	if (!session?.user?.email) return null;

	return prisma.user.findUnique({
		where: { email: session.user.email },
	});
}
