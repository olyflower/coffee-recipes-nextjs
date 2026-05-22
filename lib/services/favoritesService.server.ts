import { prisma } from "@/lib/prisma";

export async function isFavorite(userId: number, recipeId: number) {
	try {
		const favorite = await prisma.favorite.findUnique({
			where: {
				userId_recipeId: {
					userId,
					recipeId,
				},
			},
		});

		return Boolean(favorite);
	} catch (error) {
		console.error("Failed to check favorite:", error);
		return false;
	}
}

export async function addFavorite(userId: number, recipeId: number) {
	try {
		return await prisma.favorite.create({
			data: {
				userId,
				recipeId,
			},
		});
	} catch (error) {
		console.error("Failed to add favorite:", error);
		return null;
	}
}

export async function removeFavorite(userId: number, recipeId: number) {
	try {
		return await prisma.favorite.delete({
			where: {
				userId_recipeId: {
					userId,
					recipeId,
				},
			},
		});
	} catch (error) {
		console.error("Failed to remove favorite:", error);
		return null;
	}
}

export async function getUserFavorites(userId: number) {
	try {
		return await prisma.favorite.findMany({
			where: {
				userId,
			},
			include: {
				recipe: true,
			},
			orderBy: {
				createdAt: "desc",
			},
		});
	} catch (error) {
		console.error("Failed to fetch favorites:", error);
		return [];
	}
}
