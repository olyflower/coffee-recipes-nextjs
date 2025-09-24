import Slideshow from "@/components/Slideshow/Slideshow";
import Button from "@/components/Button/Button";
import hero1 from "@/public/images/latte.jpg";
import hero2 from "@/public/images/flat.jpg";
import hero3 from "@/public/images/default.jpg";
import styles from "./Hero.module.css";

const images = [
	{ src: hero1, alt: "Latte" },
	{ src: hero2, alt: "Flet White" },
	{ src: hero3, alt: "Espresso" },
];

export default async function Hero() {
	return (
		<section className={styles.hero}>
			<div>
				<Slideshow images={images} interval={3000} />
			</div>

			<div className={styles.right}>
				<h1>Welcome to the world of coffee flavors!</h1>
				<p>
					Make coffee like a real barista — right at home, with taste
					and inspiration
				</p>
				<Button href="/recipes" text="Recipes" />
			</div>
		</section>
	);
}
