import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
	MAX_FILE_SIZE,
	ALLOWED_IMAGE_EXTENSIONS,
} from "@/lib/constants/constants";

interface UseRecipeFormProps {
	initialValues?: {
		id?: number;
		title?: string;
		description?: string;
		steps?: string;
	};
	onSubmit: (formData: FormData) => Promise<void>;
	redirectUrl?: string;
}

export function useRecipeForm({
	initialValues = {},
	onSubmit,
	redirectUrl,
}: UseRecipeFormProps) {
	const router = useRouter();
	const [title, setTitle] = useState(initialValues.title || "");
	const [description, setDescription] = useState(
		initialValues.description || ""
	);
	const [steps, setSteps] = useState(initialValues.steps || "");
	const [file, setFile] = useState<File | null>(null);
	const [fileName, setFileName] = useState("");
	const [fileError, setFileError] = useState<string | null>(null);
	const [error, setError] = useState<string | null>(null);

	const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
		const selectedFile = e.target.files?.[0];
		if (!selectedFile) {
			setFile(null);
			setFileName("");
			setFileError(null);
			return;
		}

		const extension = selectedFile.name.split(".").pop()?.toLowerCase();
		if (!extension || !ALLOWED_IMAGE_EXTENSIONS.includes(extension)) {
			setFileError(
				`Unsupported file format. Allowed: ${ALLOWED_IMAGE_EXTENSIONS.join(
					", "
				)}`
			);
			e.currentTarget.value = "";
			setFile(null);
			setFileName("");
			return;
		}

		if (selectedFile.size > MAX_FILE_SIZE) {
			setFileError(
				`File is too large. Maximum: ${Math.round(
					MAX_FILE_SIZE / 1024
				)} KB.`
			);
			e.currentTarget.value = "";
			setFile(null);
			setFileName("");
		} else {
			setFile(selectedFile);
			setFileName(selectedFile.name);
			setFileError(null);
		}
	};

	const handleSubmit = async (e: FormEvent) => {
		e.preventDefault();
		setError(null);

		const formData = new FormData();
		if (initialValues.id) formData.append("id", String(initialValues.id));
		formData.append("title", title);
		formData.append("description", description);
		formData.append("steps", steps);
		if (file) formData.append("photo", file);

		try {
			await onSubmit(formData);
			if (redirectUrl) router.push(redirectUrl);
		} catch (err: any) {
			setError(err.message || "Eror");
		}
	};

	return {
		title,
		setTitle,
		description,
		setDescription,
		steps,
		setSteps,
		file,
		fileName,
		fileError,
		error,
		handleFileChange,
		handleSubmit,
	};
}
