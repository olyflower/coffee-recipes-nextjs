import { prisma } from "@/lib/prisma";
import { CoffeeFact } from "@/lib/types";

export async function getFacts(): Promise<CoffeeFact[]> {
	try {
		return await prisma.coffeeFact.findMany({
			orderBy: { createdAt: "desc" },
		});
	} catch (error) {
		console.error("Failed to fetch coffee facts:", error);
		return [];
	}
}
