import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
	return (
		<section className={styles.container}>
			<h1 className={styles.error}>404</h1>
			<p>Сторінку не знайдено</p>
			<p>На жаль, такої сторінки не існує</p>
			<Link href="/" className={styles.link}>
				Повернутись на головну
			</Link>
		</section>
	);
}
