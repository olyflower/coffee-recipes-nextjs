import Image from "next/image";
import Link from "next/link";
import { getPopularRecipes } from "@/lib/services/recipesService.server";
import styles from "./PopularRecipes.module.css";

export default async function PopularRecipes() {
	const recipes = await getPopularRecipes();

	return (
		<section className={styles.popular}>
			<h2 className={styles.title}>Популярні рецепти</h2>
			{!recipes || recipes.length === 0 ? (
				<p>На жаль, наразі немає доступних рецептів</p>
			) : (
				<div className={styles.grid}>
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
									sizes="(max-width: 480px) 80vw, (max-width: 768px) 50vw, 300px"
									style={{
										objectFit: "cover",
										borderRadius: "8px",
									}}
									priority
								/>
							</div>
							<h3>{recipe.title}</h3>
							<p>{recipe.description}</p>
						</Link>
					))}
				</div>
			)}
		</section>
	);
}
