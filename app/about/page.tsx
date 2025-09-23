import Link from "next/link";
import styles from "./page.module.css";

export default function About() {
	return (
		<main className={styles.container}>
			<h1 className={styles.title}>Coffee Recipes project</h1>

			<p className={styles.text}>
				This educational project is created for those who love coffee.
				Here you can add your own recipes, view ideas from other users,
				and learn interesting facts about coffee.
			</p>

			<p className={styles.text}>
				<strong>What is interesting:</strong>
			</p>
			<ul>
				<li>Users can create and view recipes</li>
				<li>Admins can edit and delete recipes</li>
				<li>Photos are stored in the cloud (AWS S3)</li>
				<li>Authorization via Google (NextAuth.js)</li>
			</ul>

			<p className={styles.text}>
				<strong>Technologies:</strong>
			</p>
			<ul>
				<li>Next.js + React</li>
				<li>TypeScript</li>
				<li>Prisma + Supabase / PostgreSQL</li>
				<li>NextAuth.js</li>
				<li>CSS modules</li>
				<li>AWS S3</li>
				<li>Vercel</li>
			</ul>

			<Link href="/" className={styles.link}>
				Return to home page
			</Link>
		</main>
	);
}
