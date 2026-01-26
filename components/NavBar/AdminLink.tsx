"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";

export default function AdminLink() {
	const { data: session } = useSession();
	if (!session?.user?.isAdmin) return null;

	return <Link href="/admin">Admin</Link>;
}
