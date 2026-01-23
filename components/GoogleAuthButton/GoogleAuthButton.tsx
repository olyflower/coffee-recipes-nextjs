"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
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
					<button
						onClick={() => signOut()}
						className={`${styles.btn} ${styles.btnSignIn}`}
					>
						Log out
					</button>
				</>
			) : (
				<button
					onClick={() => signIn("google", { callbackUrl: "/" })}
					className={styles.btn}
				>
					<Image
						src="https://www.svgrepo.com/show/355037/google.svg"
						alt="Google"
						width={20}
						height={20}
					/>
					Log in via Google
				</button>
			)}
		</div>
	); 
}
