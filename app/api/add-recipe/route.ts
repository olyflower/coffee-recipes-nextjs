import { NextRequest, NextResponse } from "next/server";
import { getCurrentUser } from "@/lib/services/authService";
import { validateRecipeForm } from "@/lib/validators/recipesValidator";
import { uploadFileToS3 } from "@/lib/services/fileService";
import { prisma } from "@/lib/prisma";
import { ALLOWED_IMAGE_EXTENSIONS } from "@/lib/constants/constants";

export async function POST(req: NextRequest) {
	try {
		const user = await getCurrentUser();
		if (!user) {
			return NextResponse.json(
				{ success: false, message: "User not authenticated" },
				{ status: 401 }
			);
		}

		const formData = await req.formData();
		const title = formData.get("title") as string | null;
		const description = formData.get("description") as string | null;
		const steps = formData.get("steps") as string | null;
		const file = formData.get("photo") as File | null;

		validateRecipeForm(title, description, steps, file);

		let photoUrl: string;
		if (file && file.size > 0) {
			const originalName = file.name || "";
			const extension = originalName.split(".").pop()?.toLowerCase();

			if (extension && ALLOWED_IMAGE_EXTENSIONS.includes(extension)) {
				photoUrl = await uploadFileToS3(file);
			} else {
				photoUrl = "/images/default.jpg";
			}
		} else {
			photoUrl = "/images/default.jpg";
		}

		const newRecipe = await prisma.coffeeRecipe.create({
			data: {
				title: title as string,
				description: description as string,
				steps: steps as string,
				photoUrl,
				userId: user.id,
			},
		});

		return NextResponse.json({ success: true, recipe: newRecipe });
	} catch (error: any) {
		{
			console.error("add-recipe error:", error);
			return NextResponse.json(
				{ success: false, message: error.message || "Unknown error" },
				{ status: 500 }
			);
		}
	}
}
