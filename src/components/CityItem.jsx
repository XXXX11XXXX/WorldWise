import styles from "./CityItem.module.css";

export default function CityItem({ city }) {
  const { cityName, emoji, date } = city;

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    //   weekday: "long",
    }).format(new Date(date));

  return (
    <li className={styles.cityItem}>
      <div className={styles.cityInfo}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.cityName}>{cityName}</h3>
      </div>
      <time className={styles.date}>{formatDate(date)}</time>
    </li>
  );
}

