"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Heart, Trash2 } from "lucide-react";
import styles from "./FavoriteButton.module.css";

type FavoriteButtonProps = {
	recipeId: number;
	initialFavorite: boolean;
};

export default function FavoriteButton({
	recipeId,
	initialFavorite,
}: FavoriteButtonProps) {
	const [isFavorite, setIsFavorite] = useState(initialFavorite);
	const [loading, setLoading] = useState(false);

	async function handleFavoriteToggle() {
		try {
			setLoading(true);

			const response = await fetch("/api/favorites", {
				method: isFavorite ? "DELETE" : "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					recipeId,
				}),
			});

			if (response.status === 401) {
				toast("Please sign in to save favorites ☕");
				return;
			}

			if (!response.ok) {
				throw new Error("Failed to update favorite");
			}

			setIsFavorite((prev) => !prev);
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	}

	return (
		<button
			onClick={handleFavoriteToggle}
			disabled={loading}
			className={`${styles.button} ${
				isFavorite ? styles.remove : styles.add
			}`}
		>
			{loading ? (
				"Loading..."
			) : isFavorite ? (
				<>
					<Trash2 size={18} />
					<span>Remove favorite</span>
				</>
			) : (
				<>
					<Heart size={18} />
					<span>Add favorite</span>
				</>
			)}
		</button>
	);
}
