import Image, { StaticImageData } from "next/image";
import styles from "./page.module.css";
import Coffee1 from "@/assets/images/espresso.jpg";
import Coffee2 from "@/assets/images/latte.jpg";
import Coffee3 from "@/assets/images/matcha.jpg";

type Recipe = {
	id: number;
	title: string;
	description: string;
	image: StaticImageData;
	steps: string[];
};

const recipes: Recipe[] = [
	{
		id: 1,
		title: "Еспресо",
		description: "Класичний міцний кавовий напій.",
		image: Coffee1,
		steps: ["Змолоти каву.", "Заповнити портфільтр.", "Зробити еспресо."],
	},
	{
		id: 2,
		title: "Латте",
		description: "М’яка кава з молоком і пінкою.",
		image: Coffee2,
		steps: [
			"Приготувати еспресо.",
			"Збити молоко до пінки.",
			"Змішати еспресо та молоко.",
		],
	},
	{
		id: 3,
		title: "Матча",
		description: "Зелений чай з ніжним смаком.",
		image: Coffee3,
		steps: [
			"Розмішати порошок матча з гарячою водою.",
			"Збити до піни.",
			"Налити в чашку і насолоджуватись.",
		],
	},
	{
		id: 4,
		title: "Капучино",
		description: "Класика з пінкою та какао.",
		image: Coffee1,
		steps: [
			"Приготувати еспресо.",
			"Збити молоко до пінки.",
			"Посипати какао.",
		],
	},
	{
		id: 5,
		title: "Американо",
		description: "М’який кавовий напій з водою.",
		image: Coffee2,
		steps: ["Приготувати еспресо.", "Додати гарячу воду.", "Перемішати."],
	},
	{
		id: 6,
		title: "Мокко",
		description: "Кава з шоколадом та молоком.",
		image: Coffee3,
		steps: [
			"Приготувати еспресо.",
			"Додати гарячий шоколад.",
			"Збити молоко та додати піну.",
		],
	},
];

export default function Recipes() {
	return (
		<main className={styles.recipesPage}>
			<h1>Кавові рецепти</h1>
			<div className={styles.recipesGrid}>
				{recipes.map((recipe) => (
					<div key={recipe.id} className={styles.recipeCard}>
						<Image
							src={recipe.image}
							alt={recipe.title}
							width={300}
							height={280}
							className={styles.recipeImage}
						/>
						<h2>{recipe.title}</h2>
						<p>{recipe.description}</p>
						<ol>
							{recipe.steps.map((step, index) => (
								<li key={index}>{step}</li>
							))}
						</ol>
					</div>
				))}
			</div>

			<div className={styles.ctaWrapper}>
				<a href="/add-recipe" className={styles.ctaButton}>
					Додай свій рецепт кави
				</a>
			</div>
		</main>
	);
}
