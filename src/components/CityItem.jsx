import styles from "./CityItem.module.css";
import { Link } from "react-router-dom";
import { useCities } from "../context/CitiesContext";
export default function CityItem({ city }) {
  const { cityName, emoji, date, id, position } = city;
const {currentCity, deleteCity} = useCities();
  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    //   weekday: "long",
    }).format(new Date(date));

    function handleDelete(e, id) {
      e.preventDefault();
      deleteCity(id);
    }
    

  return (
    <li >
      <Link className={`${styles.cityItem} ${currentCity.id === id ? styles["cityItem--active"] : ''}`} to={`${id}?lat=${position.lat}&lng=${position.lng}`}>
        <span className={styles.emoji}>{emoji}</span>
        <h3 className={styles.cityName}>{cityName}</h3>
        <time className={styles.date}>{formatDate(date)}</time>
        <button className={styles.deleteBtn} onClick={(e) => handleDelete(e, id)}>&times;</button>
      </Link>
    </li>
  );
}

