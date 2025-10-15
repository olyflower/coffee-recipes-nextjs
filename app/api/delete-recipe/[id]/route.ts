import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/services/authService";
import { prisma } from "@/lib/prisma";
import { deleteS3Object, getS3KeyFromUrl } from "@/lib/services/fileService";

const bucketName = process.env.AWS_BUCKET_NAME!;

export async function DELETE(req: NextRequest) {
	try {
		const session = await getSession();

		if (!session?.user?.isAdmin) {
			return NextResponse.json(
				{ message: "Access denied" },
				{ status: 403 }
			);
		}
		const url = new URL(req.url);
		const segments = url.pathname.split("/").filter(Boolean);
		const idStr = segments.at(-1);
		const id = idStr ? Number(idStr) : NaN;

		if (isNaN(id)) {
			return NextResponse.json(
				{ message: "Missing or invalid id" },
				{ status: 400 }
			);
		}

		const recipe = await prisma.coffeeRecipe.findUnique({ where: { id } });
		if (!recipe) {
			return NextResponse.json(
				{ message: "Recipe not found" },
				{ status: 404 }
			);
		}

		if (recipe.photoUrl) {
			const key = getS3KeyFromUrl(recipe.photoUrl);
			console.log("Attempting to delete photo from S3:", {
				recipeId: id,
				photoUrl: recipe.photoUrl,
				key,
				bucket: bucketName,
			});

			if (key) await deleteS3Object(bucketName, key);
		}

		await prisma.coffeeRecipe.delete({ where: { id } });

		return NextResponse.json({ message: "Deleted successfully" });
	} catch (err) {
		console.error("Failed to delete recipe:", err);
		return NextResponse.json(
			{ message: "Internal Server Error" },
			{ status: 500 }
		);
	}
}
