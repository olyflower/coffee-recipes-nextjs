import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { getRecipeBySlug } from "@/lib/services/recipesService.server";
import { CoffeeRecipe } from "@/lib/types";
import FavoriteButton from "@/components/FavoriteButton/FavoriteButton";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { isFavorite } from "@/lib/services/favoritesService.server";
import styles from "./page.module.css";

export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	const recipe = await getRecipeBySlug(slug);

	if (!recipe) {
		return {
			title: "Recipe Not Found | Coffee Recipes",
			description: "The requested recipe does not exist.",
		};
	}

	const description =
		recipe.description?.slice(0, 140) || "Step-by-step coffee recipe.";

	return {
		title: `${recipe.title} | Coffee Recipe`,
		description,
		alternates: {
			canonical: `/recipes/${recipe.slug}`,
		},
	};
}

export default async function RecipePage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	let recipe: CoffeeRecipe | null = null;

	try {
		recipe = await getRecipeBySlug(slug);
	} catch (error) {
		console.error("Failed to fetch recipe:", error);
	}

	if (!recipe) {
		return (
			<main className={styles.container}>
				<h1 className={styles.title}>Recipe not found</h1>
				<div className={styles.btnContainer}>
					<Link href="/recipes" className={styles.backBtn}>
						Back to recipes
					</Link>
				</div>
			</main>
		);
	}

	const session = await getServerSession(authOptions);

	const favorite = session?.user?.id
		? await isFavorite(Number(session.user.id), recipe.id)
		: false;

	return (
		<main className={styles.container}>
			<h1 className={styles.title}>{recipe.title}</h1>

			<div className={styles.wrapper}>
				<Image
					src={recipe.photoUrl || "/images/default.jpg"}
					alt={recipe.title}
					fill
					priority
					className={styles.image}
					sizes="(max-width: 900px) 100vw, 900px"
				/>
			</div>

			<div className={styles.steps}>
				{recipe.description && (
					<p className={styles.description}>{recipe.description}</p>
				)}
				{recipe.steps ? recipe.steps : "Instructions coming soon..."}
			</div>

			<FavoriteButton recipeId={recipe.id} initialFavorite={favorite} />
			<div className={styles.btnContainer}>
				<Link href="/recipes" className="btnPrimary">
					← Back to recipes
				</Link>
			</div>
		</main>
	);
}
