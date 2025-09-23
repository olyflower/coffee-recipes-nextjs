import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<p className={styles.title}>
					Coffee recipes – your guide to the world of coffee ☕
				</p>

				<div className={styles.links}>
					<Link href="/recipes">Recipes</Link>
					<Link href="/about">About</Link>
				</div>

				<p>© {new Date().getFullYear()} Coffee recipes</p>
			</div>
		</footer>
	);
}
