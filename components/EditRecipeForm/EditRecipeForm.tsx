"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import { editRecipe } from "@/lib/services/recipesService.client";
import { validateImageFile } from "@/lib/validators/inputValidator";
import { CoffeeRecipe } from "@/lib/types";
import styles from "./EditRecipeForm.module.css";

interface FormValues {
	id: number;
	title: string;
	description: string;
	steps: string;
	photo?: FileList;
	useDefaultPhoto?: boolean;
}

interface Props {
	recipe: CoffeeRecipe;
}

export default function EditRecipeForm({ recipe }: Props) {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		setValue,
		formState: { errors, isSubmitting },
	} = useForm<FormValues>({
		defaultValues: {
			id: recipe.id,
			title: recipe.title,
			description: recipe.description,
			steps: recipe.steps,
			useDefaultPhoto: false,
		},
	});

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		try {
			const formData = new FormData();
			formData.append("id", data.id.toString());
			formData.append("title", data.title);
			formData.append("description", data.description);
			formData.append("steps", data.steps);

			if (data.photo?.[0] && !data.useDefaultPhoto) {
				formData.append("photo", data.photo[0]);
			} else {
				formData.append("useDefaultPhoto", "true");
			}

			await editRecipe(formData);
			router.push("/recipes");
		} catch (err) {
			console.error("Failed to edit recipe", err);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<input
				{...register("title", { required: "Title is required" })}
				type="text"
				placeholder="Recipe title"
			/>
			{errors.title && (
				<p className={styles.error}>{errors.title.message}</p>
			)}

			<textarea
				{...register("description", {
					required: "Description is required",
				})}
				placeholder="Description"
			/>
			{errors.description && (
				<p className={styles.error}>{errors.description.message}</p>
			)}

			<textarea
				{...register("steps", { required: "Steps are required" })}
				placeholder="Steps"
			/>
			{errors.steps && (
				<p className={styles.error}>{errors.steps.message}</p>
			)}

			<input
				type="file"
				accept="image/*"
				{...register("photo", {
					validate: (files) => {
						const result = validateImageFile(files?.[0] ?? null);

						if (result !== true) {
							setValue("useDefaultPhoto", true);
							return result;
						}

						setValue("useDefaultPhoto", false);
						return true;
					},
				})}
			/>

			{errors.photo && (
				<p className={styles.error}>{errors.photo.message}</p>
			)}

			<button type="submit" disabled={isSubmitting}>
				{isSubmitting ? "Saving..." : "Save"}
			</button>
		</form>
	);
}
