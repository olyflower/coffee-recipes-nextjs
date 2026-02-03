"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import styles from "@/components/AddRecipeCheck/AddRecipeCheck.module.css";

export default function AddRecipeCheck() {
	const { data: session } = useSession();

	const isLoggedIn = !!session?.user;

	return (
		<div className={styles.wrapper}>
			{isLoggedIn ? (
				<Link href="/add-recipe" className="btnPrimary">
					Add your coffee recipe
				</Link>
			) : (
				<button className="btnPrimary disabled">
					Add your coffee recipe 
				</button>
			)}

			{!isLoggedIn && (
				<p className={styles.text}>
					To add a recipe, sign in with Google
				</p>
			)}
		</div>
	);
}
