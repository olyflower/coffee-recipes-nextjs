"use client";

import React from "react";
import styles from "./ToggleButton.module.css";

type ToggleButtonProps = {
	toggleMenu: () => void;
};

export default function ToggleButton({ toggleMenu }: ToggleButtonProps) {
	return (
		<button
			className={styles.toggleButton}
			onClick={toggleMenu}
			aria-label="Toggle menu"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
				width={28}
				height={28}
			>
				<path
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={2}
					d="M4 6h16M4 12h16M4 18h16"
				/>
			</svg>
		</button>
	);
}
