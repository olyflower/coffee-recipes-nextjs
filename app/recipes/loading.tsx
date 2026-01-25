import styles from "./loading.module.css";

export default function Loading() {
	const skeletonArray = Array.from({ length: 6 });

	return (
		<main className={styles.container}>
			<div className={styles.titleSkeleton} />

			<div className={styles.grid}>
				{skeletonArray.map((_, i) => (
					<div key={i} className={styles.skeletonCard}>
						<div className={styles.skeletonWrapper}>
							<div className={styles.shimmer} />
						</div>

						<div className={`${styles.line} ${styles.titleLine}`} />
						<div className={`${styles.line} ${styles.descLine}`} />
						<div className={`${styles.line} ${styles.shortLine}`} />
					</div>
				))}
			</div>
		</main>
	);
}
