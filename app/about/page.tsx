import Link from "next/link";
import styles from "./page.module.css";

export default function About() {
	return (
		<main className={styles.container}>
			<h1 className={styles.title}>Проект Coffee Recipes</h1>

			<p className={styles.text}>
				Цей навчальний проєкт створений для тих, хто любить каву. Тут
				можна додавати власні рецепти, переглядати ідеї інших
				користувачів та дізнаватися цікаві факти про каву.
			</p>

			<p className={styles.text}>
				<strong>Що є цікавого:</strong>
			</p>
			<ul>
				<li>Користувачі можуть створювати та переглядати рецепти</li>
				<li>
					Адміністратори мають змогу редагувати та видаляти рецепти
				</li>
				<li>Фотографії зберігаються у хмарі (AWS S3)</li>
				<li>Авторизація через Google (NextAuth.js)</li>
			</ul>

			<p className={styles.text}>
				<strong>Технології:</strong>
			</p>
			<ul>
				<li>Next.js + React</li>
				<li>TypeScript</li>
				<li>Prisma + Supabase / PostgreSQL</li>
				<li>NextAuth.js</li>
				<li>CSS-модулі</li>
				<li>AWS S3</li>
				<li>Vercel</li>
			</ul>

			<Link href="/" className={styles.link}>
				Повернутись на головну
			</Link>
		</main>
	);
}
