import Link from "next/link";
import Slideshow from "@/components/Slideshow/Slideshow";
import hero1 from "@/public/images/latte.jpg";
import hero2 from "@/public/images/flat.jpg";
import hero3 from "@/public/images/default.jpg";
import styles from "./Hero.module.css";

const images = [
	{ src: hero1, alt: "Латте" },
	{ src: hero2, alt: "Флет Вайт" },
	{ src: hero3, alt: "Еспрессо" },
];

export default async function Hero() {
	return (
		<section className={styles.hero}>
			<div>
				<Slideshow images={images} interval={3000} />
			</div>

			<div className={styles.right}>
				<h1>Завітай у світ кавових смаків!</h1>
				<p>
					Готуй каву як справжній бариста — просто вдома, зі смаком і
					натхненням
				</p>
				<Link href="/recipes" className={styles.btn}>
					Рецепти
				</Link>
			</div>
		</section>
	);
}
