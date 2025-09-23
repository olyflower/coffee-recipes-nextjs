"use client";

import { useState } from "react";
import Link from "next/link";
import { CoffeeRecipe } from "@/lib/types";
import { deleteRecipe } from "@/lib/services/recipesService.client";
import styles from "./AdminRecipesList.module.css";

interface Props {
	initialRecipes: CoffeeRecipe[];
}

export default function AdminRecipesList({ initialRecipes }: Props) {
	const [recipes, setRecipes] = useState(initialRecipes);

	const handleDelete = async (id: number) => {
		try {
			await deleteRecipe(id);
			setRecipes((prev) => prev.filter((r) => r.id !== id));
		} catch (err) {
			console.error(err);
		}
	};

	return (
		<section className={styles.container}>
			<h1 className={styles.title}>Admin panel: recipes</h1>
			{recipes.length === 0 ? (
				<p>There are no recipes</p>
			) : (
				<ul className={styles.recipes}>
					{recipes.map((recipe) => (
						<li key={recipe.id} className={styles.recipe}>
							<span>{recipe.title}</span>

							<div className={styles.btns}>
								<Link
									href={`/admin/edit-recipe/${recipe.id}`}
									className={styles.btn}
								>
									Edit
								</Link>

								<button
									className={styles.btn}
									onClick={() => handleDelete(recipe.id)}
								>
									Delete
								</button>
							</div>
						</li>
					))}
				</ul>
			)}
		</section>
	);
}
