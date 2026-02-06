"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Sun, Moon } from "lucide-react";
import styles from "./ThemeSwitch.module.css";

const ThemeSwitch = () => {
	const [mounted, setMounted] = useState(false);
	const { theme, setTheme } = useTheme();

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return <div className={styles.placeholder} />;
	}

	const toggleTheme = () => {
		setTheme(theme === "dark" ? "light" : "dark");
	};

	return (
		<button
			className={styles.toggleBtn}
			onClick={toggleTheme}
			aria-label="Toggle Theme"
		>
			{theme === "dark" ? (
				<Sun size={20} className={styles.iconSun} />
			) : (
				<Moon size={20} className={styles.iconMoon} />
			)}
		</button>
	);
};

export default ThemeSwitch;
