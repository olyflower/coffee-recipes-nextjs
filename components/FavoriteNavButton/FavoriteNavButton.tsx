"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { Heart } from "lucide-react";

export default function FavoriteNavButton() {
	const { data: session } = useSession();

	const isAuthenticated = Boolean(session?.user);

	function handleClick(e: React.MouseEvent<HTMLAnchorElement>) {
		if (!isAuthenticated) {
			e.preventDefault();

			toast("Please sign in to view favorites ☕");
		}
	}

	return (
		<Link href="/favorites" onClick={handleClick}>
			<Heart size={20} />
		</Link>
	);
}
