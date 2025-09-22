"use client";
import styles from "./EditRecipeForm.module.css";
import { editRecipe } from "@/lib/services/recipesService.client";
import { useRecipeForm } from "@/lib/hooks/useRecipeForm";
import { CoffeeRecipe } from "@/lib/types";

interface Props {
	recipe: CoffeeRecipe;
}

export default function EditRecipeForm({ recipe }: Props) {
	const {
		title,
		setTitle,
		description,
		setDescription,
		steps,
		setSteps,
		fileName,
		fileError,
		error,
		handleFileChange,
		handleSubmit,
	} = useRecipeForm({
		initialValues: {
			id: recipe.id,
			title: recipe.title,
			description: recipe.description,
			steps: recipe.steps,
		},

		onSubmit: async (formData) => {
			await editRecipe(formData);
		},
		redirectUrl: "/recipes",
	});

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<input
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				required
			/>
			<textarea
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				required
			/>
			<textarea
				value={steps}
				onChange={(e) => setSteps(e.target.value)}
				required
			/>
			<input type="file" accept="image/*" onChange={handleFileChange} />
			{fileName && <p>Файл: {fileName}</p>}
			{fileError && <p className={styles.error}>{fileError}</p>}
			{error && <p className={styles.error}>{error}</p>}
			<button type="submit" disabled={!!fileError}>
				Зберегти зміни
			</button>
		</form>
	);
}
