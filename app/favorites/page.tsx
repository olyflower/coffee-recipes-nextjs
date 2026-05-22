import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import { getUserFavorites } from "@/lib/services/favoritesService.server";
import FavoriteCard from "@/components/FavoriteCard/FavoriteCard";
import styles from "./page.module.css";

export default async function FavoritesPage() {
	const session = await getServerSession(authOptions);

	if (!session?.user?.id) {
		return (
			<main className={styles.authMessage}>
				<p>Please sign in to view favorites ☕</p>
			</main>
		);
	}

	const favorites = await getUserFavorites(Number(session.user.id));

	return (
		<main className={styles.container}>
			<h1 className={styles.title}>Favorite Recipes</h1>

			{favorites.length === 0 ? (
				<p className={styles.empty}>No favorite recipes yet ☕</p>
			) : (
				<ul className={styles.grid}>
					{favorites.map((favorite) => (
						<FavoriteCard key={favorite.id} favorite={favorite} />
					))}
				</ul>
			)}
		</main>
	);
}
