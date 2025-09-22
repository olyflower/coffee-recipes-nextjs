import { MAX_FILE_SIZE } from "@/lib/constants/constants";

export function validateRecipeForm(
	title: string | null,
	description: string | null,
	steps: string | null,
	file: File | null
) {
	if (!title || !description || !steps) {
		throw new Error("Please fill in all fields");
	}
	if (file && file.size > MAX_FILE_SIZE) {
		throw new Error(
			`File is too large. Maximum allowed size is: ${Math.round(
				MAX_FILE_SIZE / 1024
			)} KB.`
		);
	}
}
