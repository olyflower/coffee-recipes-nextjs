import { PrismaClient } from './app/generated/prisma/index.js';
import slugify from "slugify";

const prisma = new PrismaClient();

async function run() {
	const recipes = await prisma.coffeeRecipe.findMany();

	for (const r of recipes) {
		const s = slugify(r.title, { lower: true, strict: true });
		await prisma.coffeeRecipe.update({
			where: { id: r.id },
			data: { slug: `${s}-${r.id}` },
		});
		console.log(`Updated: ${r.title}`);
	}
}

run();
