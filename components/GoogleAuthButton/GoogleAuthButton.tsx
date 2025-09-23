"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import styles from "./GoogleAuthButton.module.css";

export default function GoogleAuthButton() {
	const { data: session } = useSession();

	return (
		<div className={styles.wrapper}>
			{session ? (
				<>
					<p className={styles.greeting}>
						Hello, {session.user?.name}
					</p>
					<button onClick={() => signOut()} className={styles.btn}>
						Log out
					</button>
				</>
			) : (
				<button
					onClick={() => signIn("google", { callbackUrl: "/" })}
					className={styles.btn}
				>
					<img
						src="https://www.svgrepo.com/show/355037/google.svg"
						alt="Google"
						className={styles.icon}
					/>
					Log in via Google
				</button>
			)}
		</div>
	);
}
