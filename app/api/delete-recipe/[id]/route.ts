import { NextRequest, NextResponse } from "next/server";
import { getSession } from "@/lib/services/authService";
import { prisma } from "@/lib/prisma";
import { deleteS3Object, getS3KeyFromUrl } from "@/lib/services/fileService";

const bucketName = process.env.AWS_BUCKET_NAME!;

export async function DELETE(_: NextRequest, context: any) {
	try {
		const session = await getSession();

		if (!session?.user?.isAdmin) {
			return NextResponse.json(
				{ message: "Access denied" },
				{ status: 403 }
			);
		}
		const params = await context.params;
		const id = Number(params.id);

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
