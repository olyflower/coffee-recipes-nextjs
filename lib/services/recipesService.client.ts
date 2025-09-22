import { CoffeeRecipe } from "@/lib/types";

export async function addRecipe(formData: FormData): Promise<CoffeeRecipe> {
	const res = await fetch("/api/add-recipe", {
		method: "POST",
		body: formData,
	});

	if (!res.ok) {
		const err = await res.json().catch(() => ({}));
		throw new Error(err.message || "Failed to add recipe");
	}

	return res.json();
}

export async function deleteRecipe(id: number) {
	const res = await fetch(`/api/delete-recipe/${id}`, { method: "DELETE" });
	if (!res.ok) throw new Error("Failed to delete recipe");
}

export async function editRecipe(formData: FormData): Promise<CoffeeRecipe> {
	const res = await fetch("/api/edit-recipe", {
		method: "PATCH",
		body: formData,
	});

	if (!res.ok) {
		const err = await res.json().catch(() => ({}));
		throw new Error(err.message || "Failed to update recipe");
	}

	return res.json();
}
