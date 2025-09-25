"use client";

import { useSession } from "next-auth/react";

export default function AddRecipeCheck() {
	const { data: session } = useSession();

	if (!session?.user) return <p>To add a recipe, sign in with Google</p>;
}
