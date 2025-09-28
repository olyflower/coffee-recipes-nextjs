import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/services/authService";
import { prisma } from "@/lib/prisma";
import {
	uploadFileToS3,
	deleteS3Object,
	getS3KeyFromUrl,
} from "@/lib/services/fileService";
import {
	validateField,
	validateImageFile,
} from "@/lib/validators/inputValidator";

const bucketName = process.env.AWS_BUCKET_NAME!;

export async function PATCH(req: NextRequest) {
	try {
		const session = await getSession();

		if (!session?.user?.isAdmin) {
			return NextResponse.json(
				{ message: "Access denied" },
				{ status: 403 }
			);
		}

		const formData = await req.formData();
		const id = formData.get("id");
		const title = formData.get("title") as string | null;
		const description = formData.get("description") as string | null;
		const steps = formData.get("steps") as string | null;
		const file = formData.get("photo") as File | null;

		if (!id || isNaN(Number(id))) {
			return NextResponse.json(
				{ message: "Invalid id" },
				{ status: 400 }
			);
		}

		validateField(title, description, steps);

		const fileValidationResult = validateImageFile(file);
		if (fileValidationResult !== true) {
			throw new Error(fileValidationResult);
		}

		const recipeId = Number(id);
		const recipe = await prisma.coffeeRecipe.findUnique({
			where: { id: recipeId },
		});
		if (!recipe) {
			return NextResponse.json(
				{ message: "Recipe not found" },
				{ status: 404 }
			);
		}
		const useDefaultPhoto = formData.get("useDefaultPhoto") === "true";

		let photoUrl = recipe.photoUrl;

		if (file) {
			if (recipe.photoUrl) {
				const oldKey = getS3KeyFromUrl(recipe.photoUrl);
				if (oldKey) await deleteS3Object(bucketName, oldKey);
			}
			photoUrl = await uploadFileToS3(file);
		} else if (useDefaultPhoto) {
			photoUrl = "/images/default.jpg";
		}

		const updatedRecipe = await prisma.coffeeRecipe.update({
			where: { id: recipeId },
			data: {
				title: title as string,
				description: description as string,
				steps: steps as string,
				photoUrl,
			},
		});

		return NextResponse.json(updatedRecipe, { status: 200 });
	} catch (error) {
		console.error("Failed to update recipe:", error);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
