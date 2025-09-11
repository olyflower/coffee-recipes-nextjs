import Hero from "@/components/Hero/Hero";
import PopularRecipes from "@/components/PopularRecipes/PopularRecipes"
import Facts from "@/components/Facts/Facts"

export default function Page() {
	return (
		<main>
			<Hero />
			<PopularRecipes/>
			<Facts/>
		</main>
	);
}
