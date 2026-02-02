export const dynamic = "force-dynamic";

import Image from "next/image";
import Link from "next/link";
import AddRecipeCheck from "@/components/AddRecipeCheck/AddRecipeCheck";
import { getRecipes } from "../../lib/services/recipesService.server";
import { CoffeeRecipe } from "@/lib/types";
import styles from "./page.module.css";

export default async function Recipes({
	searchParams,
}: {
	searchParams: { page?: string; search?: string };
}) {
	const resolvedParams = await searchParams;
	const currentPage = Number(resolvedParams?.page) || 1;
	const searchQuery = resolvedParams?.search || "";
	const limit = 6;

	let recipes: CoffeeRecipe[] = [];
	let total = 0;

	try {
		const data = await getRecipes(currentPage, limit, searchQuery);
		recipes = data.recipes;
		total = data.total;
	} catch (error) {
		console.error("Failed to fetch recipes:", error);
	}

	const totalPages = Math.ceil(total / limit);

	const createPageURL = (pageNumber: number) => {
		const params = new URLSearchParams();
		params.set("page", pageNumber.toString());
		if (searchQuery) params.set("search", searchQuery);
		return `?${params.toString()}`;
	};

	return (
		<main className={styles.container}>
			<h1 className={styles.title}>
				{searchQuery
					? `Results for "${searchQuery}"`
					: "Coffee recipes"}
			</h1>

			{recipes.length === 0 ? (
				<p className={styles.title}>
					There are currently no recipes available
				</p>
			) : (
				<>
					<div className={styles.recipes}>
						{recipes.map((recipe) => (
							<Link
								key={recipe.id}
								href={`/recipes/${recipe.slug}`}
								className={styles.card}
							>
								<div className={styles.wrapper}>
									<Image
										src={
											recipe.photoUrl ||
											"/images/default.jpg"
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
					{totalPages > 1 && (
						<div className={styles.pagination}>
							{currentPage > 1 ? (
								<Link
									href={createPageURL(currentPage - 1)}
									className={styles.pageBtn}
								>
									← Previous
								</Link>
							) : (
								<span
									className={`${styles.pageBtn} ${styles.disabled}`}
								>
									← Previous
								</span>
							)}

							<span className={styles.pageInfo}>
								Page <strong>{currentPage}</strong> of{" "}
								{totalPages}
							</span>

							{currentPage < totalPages ? (
								<Link
									href={`?page=${currentPage + 1}`}
									className={styles.pageBtn}
								>
									Next →
								</Link>
							) : (
								<span
									className={`${styles.pageBtn} ${styles.disabled}`}
								>
									Next →
								</span>
							)}
						</div>
					)}
				</>
			)}

			<AddRecipeCheck />
		</main>
	);
}
