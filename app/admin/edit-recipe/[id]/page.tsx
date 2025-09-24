import { redirect } from "next/navigation";
import { getSession } from "@/lib/services/authService";
import { getRecipeById } from "@/lib/services/recipesService.server";
import EditRecipeForm from "@/components/EditRecipeForm/EditRecipeForm";
import styles from "@/app/add-recipe/page.module.css";

export default async function EditRecipePage({
	params,
}: {
	params: { id: string };
}) {
	const session = await getSession();
	const recipe = await getRecipeById(Number(params.id));

	if (!session?.user?.isAdmin) {
		redirect("/");
	}

	return (
		<main className={styles.wrapper}>
			<h1>{recipe ? "Edit recipe" : "Recipe not found"}</h1>
			{recipe && <EditRecipeForm recipe={recipe} />}
		</main>
	);
}
