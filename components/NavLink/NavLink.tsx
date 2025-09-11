"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./NavLink.module.css";

interface NavLinkProps {
	href: string;
	children: React.ReactNode;
	onClick?: () => void;
}

export default function NavLink({ href, children, onClick }: NavLinkProps) {
	const pathname = usePathname();
	const isActive = pathname === href;

	return (
		<Link
			href={href}
			onClick={onClick}
			className={`${styles.navLink} ${isActive ? styles.active : ""}`}
		>
			{children}
		</Link>
	);
}
