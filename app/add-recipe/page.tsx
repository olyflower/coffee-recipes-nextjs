export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import AddRecipeForm from "@/components/AddRecipeForm/AddRecipeForm";
import { getSession } from "@/lib/services/authService";

export default async function AddRecipePage() {
	const session = await getSession();

	if (!session?.user) {
		redirect("/recipes");
	}

	return (
		<main>
			<AddRecipeForm />
		</main>
	);
}
