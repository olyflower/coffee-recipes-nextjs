import { redirect } from "next/navigation";
import { getSession } from "@/lib/services/authService";
import { getRecipeById } from "@/lib/services/recipesService.server";
import EditRecipeForm from "@/components/EditRecipeForm/EditRecipeForm";
import styles from "@/components/EditRecipeForm/EditRecipeForm.module.css";

export default async function EditRecipePage({
	params,
}: {
	params: Promise<{ id: string }>;
}) {
	const { id } = await params;
	const session = await getSession();
	const recipe = await getRecipeById(Number(id));

	if (!session?.user?.isAdmin) {
		redirect("/");
	}

	return (
		<main style={{ padding: "40px 15px" }}>
			{recipe ? (
				<EditRecipeForm recipe={recipe} />
			) : (
				<div className={styles.form}>
					<h1 className={styles.title}>Recipe not found</h1>
				</div>
			)}
		</main>
	);
}
