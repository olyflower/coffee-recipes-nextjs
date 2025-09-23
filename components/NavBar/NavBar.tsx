"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import Logo from "@/public/images/logo.svg";
import MobMenu from "@/components/MobMenu/MobMenu";
import GoogleAuthButton from "@/components/GoogleAuthButton/GoogleAuthButton";
import styles from "./NavBar.module.css";

type NavLinkType = {
	href: string;
	label: string;
};

const navLinks: NavLinkType[] = [
	{ href: "/", label: "Home" },
	{ href: "/recipes", label: "Recipes" },
	{ href: "/about", label: "About" },
];

export default function Navbar() {
	const { data: session } = useSession();
	const isAdmin = session?.user?.isAdmin ?? false;

	return (
		<header className={styles.header}>
			<Link href="/" className={styles.logo}>
				<Image src={Logo} alt="Кава" width={48} height={48} />
				<span className={styles.title}>Coffee recipes</span>
			</Link>

			<div className={styles.mobile}>
				<MobMenu navLinks={navLinks} />
			</div>
			<div className={styles.links}>
				<nav className={styles.desktop}>
					{navLinks.map((link) => (
						<Link key={link.href} href={link.href}>
							{link.label}
						</Link>
					))}
					{isAdmin && <Link href="/admin">Admin</Link>}
				</nav>
				<div className={styles.google}>
					<GoogleAuthButton />
				</div>
			</div>
		</header>
	);
}
