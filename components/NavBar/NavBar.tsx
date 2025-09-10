"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Logo from "@/assets/images/logo.png";
import styles from "./NavBar.module.css";
import ToggleButton from "@/components/ToggleButton/ToggleButton";

export default function Navbar() {
	const [menuOpen, setMenuOpen] = useState(false);
	const toggleMenu = () => setMenuOpen(!menuOpen);
	const closeMenu = () => setMenuOpen(false);

	return (
		<header className={styles.header}>
			<Link href="/" className={styles.logo}>
				<Image src={Logo} alt="Кава" width={64} height={64} priority />
				<span>Кавові рецепти</span>
			</Link>

			<ToggleButton toggleMenu={toggleMenu} />

			<nav className={styles.desktopNav}>
				<Link href="/">Головна</Link>
				<Link href="/recipes">Рецепти</Link>
				<Link href="/login">Вхід</Link>
				<Link href="/register">Реєстрація</Link>
			</nav>

			{menuOpen && (
	<>
		<div className={styles.mobileOverlay} onClick={closeMenu}></div>
		<div className={styles.mobileMenu}>
			<nav>
				<Link href="/" onClick={closeMenu}>Головна</Link>
				<Link href="/recipes" onClick={closeMenu}>Рецепти</Link>
				<Link href="/login" onClick={closeMenu}>Вхід</Link>
				<Link href="/register" onClick={closeMenu}>Реєстрація</Link>
			</nav>
		</div>
	</>
)}

		</header>
	);
}
