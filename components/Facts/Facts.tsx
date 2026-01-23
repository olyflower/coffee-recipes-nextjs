import { CoffeeFact } from "@/lib/types";
import { getFacts } from "@/lib/services/factsService";
import styles from "./Facts.module.css";

export default async function CoffeeFacts() {
	let facts: CoffeeFact[] = [];

	try {
		facts = await getFacts();
	} catch (error) {
		console.error("Failed to fetch coffee facts:", error);
	}

	return (
		<section className={styles.container}>
			<h2 className={styles.title}>Interesting facts about coffee</h2>
			{!facts || facts.length === 0 ? (
				<p className={styles.text}>
					There are currently no facts available
				</p>
			) : (
				<div className={styles.cards}>
					{facts.map((fact) => (
						<div key={fact.id} className={styles.card}>
							<h3 className={styles.subtitle}>{fact.title}</h3>
							<p className={styles.text}>{fact.description}</p>
						</div>
					))}
				</div>
			)}
		</section> 
	);
}
