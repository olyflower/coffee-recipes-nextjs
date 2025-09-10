import Link from "next/link";
import Image from "next/image";
import CoffeeImage from "@/assets/images/hero.jpg"; 
import styles from "./page.module.css"

export default function Page() {
	return (
		<main className={styles.hero}>
			<div className={styles.heroLeft}>
				<Image src={CoffeeImage} alt="Кава" width={500} height={300} />
			</div>
			<div className={styles.heroRight}>
				<h1>Завітай у світ кавових смаків!</h1>
				<p>
					Готуй каву як справжній бариста — просто вдома, зі смаком і натхненням
				</p>
				<Link href="/recipes" className={styles.heroBtn}>
					Recipes
				</Link>
			</div>
		</main>
	);
}
