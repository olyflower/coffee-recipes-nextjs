import Image from "next/image";
import Link from "next/link";
import Logo from "@/assets/images/logo.png";
import NavLink from "@/components/NavLink/NavLink";
import MobMenu from "@/components/MobMenu/MobMenu";
import styles from "./NavBar.module.css";

type NavLinkType = {
	href: string;
	label: string;
};

const navLinks: NavLinkType[] = [
	{ href: "/", label: "Головна" },
	{ href: "/recipes", label: "Рецепти" },
	{ href: "/login", label: "Вхід" },
	{ href: "/register", label: "Реєстрація" },
];

export default function Navbar() {
	return (
		<header className={styles.header}>
			<Link href="/" className={styles.logo}>
				<Image src={Logo} alt="Кава" width={64} height={64} priority />
				<span>Кавові рецепти</span>
			</Link>

			<MobMenu navLinks={navLinks} />

			<nav className={styles.desktopNav}>
				{navLinks.map((link) => (
					<NavLink key={link.href} href={link.href}>
						{link.label}
					</NavLink>
				))}
			</nav>
		</header>
	);
}
