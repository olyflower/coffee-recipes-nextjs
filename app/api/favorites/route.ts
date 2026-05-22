import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth";
import {
	addFavorite,
	removeFavorite,
} from "@/lib/services/favoritesService.server";

export async function POST(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 },
			);
		}

		const body = await req.json();

		const recipeId = Number(body.recipeId);

		if (!recipeId) {
			return NextResponse.json(
				{ error: "Recipe id is required" },
				{ status: 400 },
			);
		}

		const favorite = await addFavorite(Number(session.user.id), recipeId);

		return NextResponse.json(favorite);
	} catch (error) {
		console.error("Failed to add favorite:", error);

		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}

export async function DELETE(req: NextRequest) {
	try {
		const session = await getServerSession(authOptions);

		if (!session?.user?.id) {
			return NextResponse.json(
				{ error: "Unauthorized" },
				{ status: 401 },
			);
		}

		const body = await req.json();

		const recipeId = Number(body.recipeId);

		if (!recipeId) {
			return NextResponse.json(
				{ error: "Recipe id is required" },
				{ status: 400 },
			);
		}

		const deletedFavorite = await removeFavorite(
			Number(session.user.id),
			recipeId,
		);

		return NextResponse.json(deletedFavorite);
	} catch (error) {
		console.error("Failed to remove favorite:", error);

		return NextResponse.json(
			{ error: "Internal server error" },
			{ status: 500 },
		);
	}
}
