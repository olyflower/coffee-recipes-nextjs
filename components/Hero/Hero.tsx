import Link from "next/link";
import Image from "next/image";
import heroImage from "@/public/images/cover.jpg";
import styles from "./Hero.module.css";

export default async function Hero() {
	return (
		<section className={styles.hero}>
			<div className={styles.bgWrapper}>
				<Image
					src={heroImage}
					alt="Coffee background"
					fill
					priority
					placeholder="blur"
					className={styles.bgImage}
				/>
				<div className={styles.overlay}></div>
			</div>

			<div className={styles.content}>
				<h1>
					Welcome to the world of{" "}
					<span className={styles.accentText}>coffee</span> flavors!
				</h1>
				<p>
					Make coffee like a real barista — right at home, with taste
					and inspiration.
				</p>
				<Link href="/recipes" className="btnPrimary">
					Explore Recipes
				</Link>
			</div>
		</section>
	);
}
