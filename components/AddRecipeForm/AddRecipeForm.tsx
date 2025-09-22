"use client";
import styles from "./AddRecipeForm.module.css";
import { addRecipe } from "@/lib/services/recipesService.client";
import { useRecipeForm } from "@/lib/hooks/useRecipeForm";

export default function AddRecipeForm() {
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
		onSubmit: async (formData) => {
			await addRecipe(formData);
		},
		redirectUrl: "/recipes",
	});

	return (
		<form onSubmit={handleSubmit} className={styles.form}>
			<input 
				type="text"
				value={title}
				onChange={(e) => setTitle(e.target.value)}
				placeholder="Назва рецепту"
				required
			/>
			<textarea
				value={description}
				onChange={(e) => setDescription(e.target.value)}
				placeholder="Опис"
				required
			/>
			<textarea
				value={steps}
				onChange={(e) => setSteps(e.target.value)}
				placeholder="Рецепт приготування"
				required
			/>
			<input type="file" accept="image/*" onChange={handleFileChange} />
			{fileName && <p className={styles.file}>Файл: {fileName}</p>}
			{fileError && <p className={styles.error}>{fileError}</p>}
			{error && <p className={styles.error}>{error}</p>}
			<button className={styles.btn} type="submit" disabled={!!fileError}>
				Зберегти рецепт
			</button>
		</form>
	);
}
