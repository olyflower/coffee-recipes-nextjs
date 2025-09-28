import {
	MAX_FILE_SIZE,
	ALLOWED_IMAGE_EXTENSIONS,
} from "@/lib/constants/constants";

export function validateImageFile(file?: File | null): true | string {
	if (!file) return true;

	if (file.size > MAX_FILE_SIZE) {
		return `File is too large. Maximum allowed size is: ${Math.round(
			MAX_FILE_SIZE / 1024
		)} KB.`;
	}

	const extension = file.name.split(".").pop()?.toLowerCase();
	if (!extension || !ALLOWED_IMAGE_EXTENSIONS.includes(extension)) {
		return `Only the following formats are allowed: ${ALLOWED_IMAGE_EXTENSIONS.join(
			", "
		)}`;
	}

	return true;
}

export function validateField(
	title: string | null,
	description: string | null,
	steps: string | null
) {
	if (!title || !description || !steps) {
		throw new Error("Please fill in all fields");
	}
}
