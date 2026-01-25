import { MetadataRoute } from "next";
import { getRecipes } from "@/lib/services/recipesService.server";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = "https://coffee-recipes-nextjs.vercel.app";

	const { recipes } = await getRecipes(1, 100);

	const recipeUrls = recipes.map((recipe) => ({
		url: `${baseUrl}/recipes/${recipe.id}`,
		lastModified: new Date(),
	}));

	return [
		{
			url: baseUrl,
			lastModified: new Date(),
			priority: 1,
		},
		{
			url: `${baseUrl}/recipes`,
			lastModified: new Date(),
			priority: 0.8,
		},
		{
			url: `${baseUrl}/about`,
			lastModified: new Date(),
			changeFrequency: "monthly" as const,
			priority: 0.5,
		},
		...recipeUrls,
	];
}
