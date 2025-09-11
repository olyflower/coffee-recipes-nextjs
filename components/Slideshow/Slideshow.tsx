"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { StaticImageData } from "next/image";
import styles from "./Slideshow.module.css";

type SlideshowProps = {
  images: { src: string | StaticImageData; alt: string }[];
  interval?: number;
};

export default function Slideshow({ images, interval = 3000 }: SlideshowProps) {
	const [index, setIndex] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setIndex((prev) => (prev + 1) % images.length);
		}, interval);

		return () => clearInterval(timer);
	}, [images.length, interval]);

	return (
		<div className={styles.slideshow}>
			{images.map((img, i) => (
				<Image
					key={i}
					src={img.src}
					alt={img.alt}
					fill
					sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
					className={`${styles.slide} ${
						i === index ? styles.active : ""
					}`}
				/>
			))}
		</div>
	);
}
