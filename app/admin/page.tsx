export const dynamic = "force-dynamic";

import { redirect } from "next/navigation";
import { getSession } from "@/lib/services/authService";
import { getRecipes } from "@/lib/services/recipesService.server";
import AdminRecipesList from "@/components/AdminRecipesList/AdminRecipesList";

export default async function AdminRecipesPage() {
	const recipes = await getRecipes();
	const session = await getSession();

	if (!session?.user?.isAdmin) {
		redirect("/");
	}

	return (
		<main>
			<AdminRecipesList initialRecipes={recipes} />
		</main>
	);
}
