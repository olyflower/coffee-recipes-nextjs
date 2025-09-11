"use client";
import { useState } from "react";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import NavLink from "@/components/NavLink/NavLink";
import styles from "./MobMenu.module.css";

type NavLinkType = {
	href: string;
	label: string;
};

interface MobMenuProps {
	navLinks: NavLinkType[];
}

export default function MobMenu({ navLinks }: MobMenuProps) {
	const [menuOpen, setMenuOpen] = useState(false);
	const toggleMenu = () => setMenuOpen(!menuOpen);
	const closeMenu = () => setMenuOpen(false);

	return (
		<>
			<ToggleButton toggleMenu={toggleMenu} />

			{menuOpen && (
				<>
					<div
						className={styles.mobileOverlay}
						onClick={closeMenu}
					></div>
					<div className={styles.mobileMenu}>
						<nav>
							{navLinks.map((link) => (
								<NavLink
									key={link.href}
									href={link.href}
									onClick={closeMenu}
								>
									{link.label}
								</NavLink>
							))}
						</nav>
					</div>
				</>
			)}
		</>
	);
}
