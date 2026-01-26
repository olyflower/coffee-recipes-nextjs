import { Suspense } from "react";
import Link from "next/link";
import { Coffee } from "lucide-react";
import MobMenu from "@/components/MobMenu/MobMenu";
import SearchBar from "../SearchBar/SearchBar";
import GoogleAuthButton from "@/components/GoogleAuthButton/GoogleAuthButton";
import AdminLink from "./AdminLink";
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
	return (
		<header className={styles.header}>
			<Link href="/" className={styles.logo}>
				<div className={styles.logoBadge}>
					<Coffee
						size={28}
						strokeWidth={1.8}
						color="var(--color-accent)"
					/>
				</div>
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
					<AdminLink />
				</nav>
				<Suspense
					fallback={<div className={styles.searchPlaceholder} />}
				>
					<SearchBar />
				</Suspense>
				<div className={styles.google}>
					<GoogleAuthButton />
				</div>
			</div>
		</header>
	);
}
