import Image, { StaticImageData } from "next/image";
import styles from "./PopularRecipes.module.css";

import Coffee1 from "@/assets/images/espresso.jpg";
import Coffee2 from "@/assets/images/latte.jpg";
import Coffee3 from "@/assets/images/matcha.jpg";

type Recipe = {
  id: number;
  title: string;
  description: string;
  image: StaticImageData;
};

const popularRecipes: Recipe[] = [
  {
    id: 1,
    title: "Еспресо",
    description: "Класичний міцний кавовий напій.",
    image: Coffee1,
  },
  {
    id: 2,
    title: "Латте",
    description: "М’яка кава з молоком і ніжною пінкою.",
    image: Coffee2,
  },
  {
    id: 3,
    title: "Матча",
    description: "Альтернатива каві з тонізуючим ефектом.",
    image: Coffee3,
  },
];

export default function PopularRecipes() {
  return (
    <section className={styles.popular}>
      <h2>Популярні рецепти</h2>
      <div className={styles.grid}>
        {popularRecipes.map((recipe) => (
          <div key={recipe.id} className={styles.card}>
            <Image
              src={recipe.image}
              alt={recipe.title}
              width={300}
              height={260}
              className={styles.image}
            />
            <h3>{recipe.title}</h3>
            <p>{recipe.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
