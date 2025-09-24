import Link from "next/link";
import styles from "./Button.module.css";

type ButtonProps = {
	href: string;
	text: string;
};

export default function Button({ href, text }: ButtonProps) {
	return (
		<Link href={href} className={styles.btn}>
			{text}
		</Link>
	);
}
