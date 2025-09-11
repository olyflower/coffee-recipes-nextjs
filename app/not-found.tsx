import Link from "next/link";
import styles from "./NotFound.module.css";

export default function NotFound() {
  return (
    <div className={styles.container}>
      <h1>404</h1>
      <h2>Сторінку не знайдено</h2>
      <p>На жаль, такої сторінки не існує. Спробуйте повернутися на головну.</p>
      <Link href="/" className={styles.homeLink}>
        Повернутись на головну
      </Link>
    </div>
  );
}
