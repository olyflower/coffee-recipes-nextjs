import { prisma } from "@/lib/prisma";
import { CoffeeRecipe } from "@/lib/types";

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

export async function getRecipes(): Promise<CoffeeRecipe[]> {
	try {
		return await prisma.coffeeRecipe.findMany({
			orderBy: { order: "asc" },
		});
	} catch (error) {
		console.error("Failed to fetch coffee recipes:", error);
		return [];
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
