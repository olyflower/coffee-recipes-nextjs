import { prisma } from "@/lib/prisma";
import { CoffeeRecipe } from "@/lib/types";

export type PaginatedRecipes = {
	recipes: CoffeeRecipe[];
	total: number;
};

export async function getPopularRecipes(limit = 3): Promise<CoffeeRecipe[]> {
	try {
		return await prisma.coffeeRecipe.findMany({
			take: limit,
			orderBy: { id: "asc" },
		});
	} catch (error) {
		console.error("Failed to fetch coffee recipes:", error);
		return [];
	}
}

export async function getRecipes(
	page = 1,
	limit = 6,
): Promise<PaginatedRecipes> {
	const skip = (page - 1) * limit;

	try {
		const [recipes, total] = await Promise.all([
			prisma.coffeeRecipe.findMany({
				skip: skip,
				take: limit,
				orderBy: { order: "asc" },
			}),
			prisma.coffeeRecipe.count(),
		]);
		return { recipes, total };
	} catch (error) {
		console.error("Failed to fetch coffee recipes:", error);
		return { recipes: [], total: 0 };
	}
}

export async function getRecipeById(id: number): Promise<CoffeeRecipe | null> {
	try {
		const recipe = await prisma.coffeeRecipe.findUnique({
			where: { id },
		});
		return recipe;
	} catch (error) {
		console.error("Failed to fetch recipe by id:", error);
		return null;
	}
}
