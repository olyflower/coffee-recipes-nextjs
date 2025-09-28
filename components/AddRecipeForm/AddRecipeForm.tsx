"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { useRouter } from "next/navigation";
import styles from "./AddRecipeForm.module.css";
import { addRecipe } from "@/lib/services/recipesService.client";
import { validateImageFile } from "@/lib/validators/inputValidator";

interface FormValues {
	title: string;
	description: string;
	steps: string;
	photo?: FileList;
}

export default function AddRecipeForm() {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors, isSubmitting },
	} = useForm<FormValues>({
		defaultValues: {
			title: "",
			description: "",
			steps: "",
		},
	});

	const onSubmit: SubmitHandler<FormValues> = async (data) => {
		try {
			const formData = new FormData();
			formData.append("title", data.title);
			formData.append("description", data.description);
			formData.append("steps", data.steps);

			if (data.photo?.[0]) {
				formData.append("photo", data.photo[0]);
			}

			await addRecipe(formData);
			router.push("/recipes");
		} catch (err) {
			console.error("Failed to add recipe", err);
		}
	};

	return (
		<form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
			<input
				type="text"
				placeholder="Name of the recipe"
				{...register("title", { required: "Title is required" })}
			/>
			{errors.title && (
				<p className={styles.error}>{errors.title.message}</p>
			)}

			<textarea
				placeholder="Description"
				{...register("description", {
					required: "Description is required",
				})}
			/>
			{errors.description && (
				<p className={styles.error}>{errors.description.message}</p>
			)}

			<textarea
				placeholder="Cooking recipe"
				{...register("steps", { required: "Steps are required" })}
			/>
			{errors.steps && (
				<p className={styles.error}>{errors.steps.message}</p>
			)}

			<input
				type="file"
				accept="image/*"
				{...register("photo", {
					validate: (files) => validateImageFile(files?.[0]),
				})}
			/>

			{errors.photo && (
				<p className={styles.error}>{errors.photo.message}</p>
			)}

			<button
				className={styles.btn}
				type="submit"
				disabled={isSubmitting || !!errors.photo}
			>
				Save the recipe
			</button>
		</form>
	);
}
