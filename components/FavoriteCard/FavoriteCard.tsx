"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

import styles from "@/app/favorites/page.module.css";

type FavoriteCardProps = {
	favorite: {
		id: number;
		recipe: {
			id: number;
			title: string;
			slug: string;
			photoUrl: string | null;
		};
	};
};

export default function FavoriteCard({ favorite }: FavoriteCardProps) {
	const [isRemoving, setIsRemoving] = useState(false);

	const router = useRouter();

	async function handleRemove() {
		try {
			setIsRemoving(true);

			const response = await fetch("/api/favorites", {
				method: "DELETE",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					recipeId: favorite.recipe.id,
				}),
			});

			if (!response.ok) {
				throw new Error("Failed to remove favorite");
			}

			router.refresh();

			toast.success("Removed from favorites");
		} catch (error) {
			console.error(error);

			toast.error("Something went wrong");
		} finally {
			setIsRemoving(false);
		}
	}

	return (
		<li className={styles.card}>
			<button
				onClick={handleRemove}
				disabled={isRemoving}
				className={styles.removeBtn}
			>
				<Trash2 size={18} />
			</button>

			<div className={styles.content}>
				<div className={styles.imageWrapper}>
					<Image
						src={favorite.recipe.photoUrl || "/images/default.jpg"}
						alt={favorite.recipe.title}
						fill
						className={styles.image}
						sizes="80px"
					/>
				</div>

				<div>
					<Link
						href={`/recipes/${favorite.recipe.slug}`}
						className={styles.link}
					>
						{favorite.recipe.title}
					</Link>
				</div>
			</div>
		</li>
	);
}
