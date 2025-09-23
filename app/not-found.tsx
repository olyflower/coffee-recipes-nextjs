import Link from "next/link";
import styles from "./not-found.module.css";

export default function NotFound() {
	return (
		<section className={styles.container}>
			<h1 className={styles.error}>404</h1>
			<p>Page not found</p>
			<Link href="/" className={styles.link}>
				Return to home page
			</Link>
		</section>
	);
}
