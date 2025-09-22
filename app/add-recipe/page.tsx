import { redirect } from "next/navigation";
import AddRecipeForm from "@/components/AddRecipeForm/AddRecipeForm";
import { getSession } from "@/lib/services/authService";
import styles from "./page.module.css";

export default async function AddRecipePage() {
	const session = await getSession();

	if (!session?.user) {
		redirect("/recipes");
	}

	return (
		<main className={styles.wrapper}>
			<h1>Додати рецепт</h1>
			<AddRecipeForm />
		</main>
	);
}
