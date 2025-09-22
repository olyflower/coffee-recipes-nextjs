import { redirect } from "next/navigation";
import { getSession } from "@/lib/services/authService";
import { getRecipeById } from "@/lib/services/recipesService.server";
import EditRecipeForm from "@/components/EditRecipeForm/EditRecipeForm";
import styles from "@/app/add-recipe/page.module.css";

interface Props {
  params: { id: string } | Promise<{ id: string }>;
}

export default async function EditRecipePage({ params }: Props) {
	const session = await getSession();
	const { id } = await params;
	const recipe = await getRecipeById(Number(id));

	if (!session?.user?.isAdmin) {
		redirect("/");
	}

	return (
		<main className={styles.wrapper}>
			<h1>{recipe ? "Редагування рецепту" : "Рецепт не знайдено"}</h1>
			{recipe && <EditRecipeForm recipe={recipe} />}
		</main>
	);
}
