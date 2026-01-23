import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<h2 className={styles.title}>
					Coffee recipes – your guide to the world of coffee
				</h2>

				<div className={styles.links}>
					<Link href="/recipes">Recipes</Link>
					<Link href="/about">About</Link>
				</div>

				<p className={styles.copyright}>
					© {new Date().getFullYear()} Coffee recipes
				</p>
			</div>
		</footer>
	);
}
