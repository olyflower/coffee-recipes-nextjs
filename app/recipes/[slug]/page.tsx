import Image from "next/image";
import Link from "next/link";
import { getRecipeBySlug } from "@/lib/services/recipesService.server";
import { CoffeeRecipe } from "@/lib/types";
import styles from "./page.module.css";

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

			<div className={styles.btnContainer}>
				<Link href="/recipes" className="btnPrimary">
					← Back to recipes
				</Link>
			</div>
		</main>
	);
}
