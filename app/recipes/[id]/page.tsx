import Image from "next/image";
import Button from "@/components/Button/Button";
import { getRecipeById } from "@/lib/services/recipesService.server";
import { CoffeeRecipe } from "@/lib/types";
import styles from "./page.module.css";

export default async function RecipePage({ params }: any) {
	const { id } = await params;

	let recipe: CoffeeRecipe | null = null;

	try {
		recipe = await getRecipeById(Number(id));
	} catch (error) {
		console.error("Failed to fetch recipe:", error);
	}

	return (
		<main className={styles.container}>
			{recipe ? (
				<>
					<h1 className={styles.title}>{recipe.title}</h1>
					<div className={styles.wrapper}>
						<Image
							src={recipe.photoUrl || "/images/default.jpg"}
							alt={recipe.title}
							fill
							className={styles.image}
							sizes="(max-width: 768px) 100vw, 800px"
						/>
					</div>
					<div className={styles.steps}>{recipe.steps || ""}</div>
				</>
			) : (
				<>
					<h1 className={styles.title}>Recipe not found</h1>
				</>
			)}

			<div className={styles.btn}>
				<Button href="/recipes" text="Back to recipes" />
			</div>
		</main>
	);
}
