import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
	return (
		<footer className={styles.footer}>
			<div className={styles.container}>
				<p>Кавові рецепти – ваш гід у світі кави ☕</p>

				<div className={styles.navLinks}>
					<Link href="/recipes">Рецепти</Link>
					<Link href="/facts">Цікаві факти</Link>
					<Link href="/about">Про нас</Link>
				</div>

				<p className={styles.copy}>
					© {new Date().getFullYear()} Кавові рецепти
				</p>
			</div>
		</footer>
	);
}
