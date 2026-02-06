import Link from "next/link";
import styles from "./page.module.css";

const technologies = [
	{ name: "Next.js", url: "https://nextjs.org/" },
	{ name: "TypeScript", url: "https://www.typescriptlang.org/" },
	{ name: "Prisma", url: "https://www.prisma.io/" },
	{ name: "PostgreSQL", url: "https://www.postgresql.org/" },
	{ name: "NextAuth.js", url: "https://next-auth.js.org/" },
	{ name: "AWS S3", url: "https://aws.amazon.com/s3/" },
	{ name: "Vercel", url: "https://vercel.com/" },
];

export default function About() {
	return (
		<main className={styles.container}>
			<section className={styles.hero}>
				<h1 className={styles.title}>Coffee Recipes Project</h1>
				<p className={styles.text}>
					This educational project is created for those who love
					coffee. Here you can share your passion, discover unique
					brewing methods, and explore the rich culture of coffee.
				</p>
			</section>

			<div className={styles.cards}>
				<div className={styles.card}>
					<h3>What is interesting</h3>
					<ul>
						<li>Recipe search by title</li>
						<li>Users can create and view recipes</li>
						<li>Admins can edit and delete recipes</li>
						<li>Forms with validation (React Hook Form)</li>
						<li>Dark and Light mode</li>
						<li>Cloud photo storage (AWS S3)</li>
						<li>Secure Auth via Google</li>
					</ul>
				</div>

				<div className={styles.card}>
					<h3>Technologies</h3>
					<div className={styles.techStack}>
						{technologies.map((tech) => (
							<a
								key={tech.name}
								href={tech.url}
								target="_blank"
								rel="noopener noreferrer"
								className={styles.techLink}
							>
								{tech.name}
							</a>
						))}
					</div>
				</div>
			</div>

			<div className={styles.action}>
				<Link href="/" className="btnPrimary">
					Return to home page
				</Link>
			</div>
		</main>
	);
}
