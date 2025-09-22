"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Link from "next/link";
import ToggleButton from "@/components/ToggleButton/ToggleButton";
import GoogleAuthButton from "../GoogleAuthButton/GoogleAuthButton";
import styles from "./MobMenu.module.css";

type NavLinkType = {
	href: string;
	label: string;
};

interface MobMenuProps {
	navLinks: NavLinkType[];
}

export default function MobMenu({ navLinks }: MobMenuProps) {
	const { data: session } = useSession();
	const isAdmin = session?.user?.isAdmin ?? false;
	const [menuOpen, setMenuOpen] = useState(false);
	const toggleMenu = () => setMenuOpen(!menuOpen);
	const closeMenu = () => setMenuOpen(false);

	return (
		<>
			<ToggleButton toggleMenu={toggleMenu} />

			{menuOpen && (
				<>
					<div className={styles.overlay} onClick={closeMenu}></div>
					<div className={styles.menu}>
						<nav>
							{navLinks.map((link) => (
								<Link
									key={link.href}
									href={link.href}
									onClick={closeMenu}
								>
									{link.label}
								</Link>
							))}
							{isAdmin && (
								<Link href="/admin" onClick={closeMenu}>
									Адмінка
								</Link>
							)}
						</nav>
						<GoogleAuthButton />
					</div>
				</>
			)}
		</>
	);
}
