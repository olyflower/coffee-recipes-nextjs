"use client";

import Link from "next/link";
import Slideshow from "@/components/Slideshow/Slideshow";
import styles from "./Hero.module.css";

import Coffee1 from "@/assets/images/espresso.jpg";
import Coffee2 from "@/assets/images/latte.jpg";
import Coffee3 from "@/assets/images/matcha.jpg";

const images = [
  { src: Coffee1, alt: "Еспресо" },
  { src: Coffee2, alt: "Латте" },
  { src: Coffee3, alt: "Матча" },
];

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.heroLeft}>
        <Slideshow images={images} interval={3000} />
      </div>

      <div className={styles.heroRight}>
        <h1>Завітай у світ кавових смаків!</h1>
        <p>
          Готуй каву як справжній бариста — просто вдома, зі смаком і натхненням
        </p>
        <Link href="/recipes" className={styles.heroBtn}>
          Рецепти
        </Link>
      </div>
    </section>
  );
}
