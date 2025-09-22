export type CoffeeFact = {
	id: number;
	title: string;
	description: string;
	createdAt: Date;
};

export type CoffeeRecipe = {
	id: number;
	title: string;
	description: string;
	steps: string;
	photoUrl: string | null;
	createdAt: Date;
	userId: number | null;
	order: number | null;
};
