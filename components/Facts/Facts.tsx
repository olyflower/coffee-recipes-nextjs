import styles from "./Facts.module.css";

const facts = [
  {
    id: 1,
    title: "Кава – другий напій у світі",
    text: "Після води, кава є найпопулярнішим напоєм у світі.",
  },
  {
    id: 2,
    title: "Батьківщина кави",
    text: "Вважається, що кава походить з Ефіопії, де її вперше почали вирощувати у IX столітті.",
  },
  {
    id: 3,
    title: "Кавові зерна – це не зерна",
    text: "Насправді це кісточки ягід кавового дерева.",
  },
  {
    id: 4,
    title: "Найдорожча кава",
    text: "Копі Лувак — найдорожча кава, яка виробляється з зерен, що пройшли через шлунок циветти.",
  },
];

export default function CoffeeFacts() {
  return (
    <section className={styles.factsSection}>
      <h2>Цікаві факти про каву</h2>
      <div className={styles.factsGrid}>
        {facts.map((fact) => (
          <div key={fact.id} className={styles.factCard}>
            <h3>{fact.title}</h3>
            <p>{fact.text}</p>
          </div>
        ))}
      </div>
    </section>
  );
}