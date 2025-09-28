export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import Button from "@/components/Button/Button";
import AddRecipeCheck from "@/components/AddRecipeCheck";
import { getRecipes } from "../../lib/services/recipesService.server";
import { CoffeeRecipe } from "@/lib/types";
import styles from "./page.module.css";

export default async function Recipes() {
	let recipes: CoffeeRecipe[] = [];

	try {
		recipes = await getRecipes();
	} catch (error) {
		console.error("Failed to fetch recipes:", error);
	}

	return (
		<main className={styles.container}>
			<h1 className={styles.title}>Coffee recipes</h1>

			{recipes.length === 0 ? (
				<p className={styles.title}>
					There are currently no recipes available
				</p>
			) : (
				<div className={styles.recipes}>
					{recipes.map((recipe) => (
						<Link
							key={recipe.id}
							href={`/recipes/${recipe.id}`}
							className={styles.card}
						>
							<div className={styles.wrapper}>
								<Image
									src={
										recipe.photoUrl || "/images/default.jpg"
									}
									alt={recipe.title}
									fill
									sizes="(max-width:480px) 80vw, (max-width:768px) 50vw, 300px"
									className={styles.image}
								/>
							</div>

							<h2>{recipe.title}</h2>
							<p>{recipe.description}</p>
						</Link>
					))}
				</div>
			)}

			<div className={styles.cta}>
				<Button href="/add-recipe" text="Add your coffee recipe" />
				<AddRecipeCheck />
			</div>
		</main>
	);
}
