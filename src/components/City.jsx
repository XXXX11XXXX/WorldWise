import { useEffect } from "react";
import styles from "./City.module.css";
import { useParams } from "react-router-dom";
import { useCities } from "../context/CitiesContext";
import Spinner from "./Spinner";
import Message from "./Message";
import BackButton from "./BackButton";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  }).format(new Date(date));
  // const getCountryFlagEmoji = (countryCode) => {
  //   const codePoints = countryCode
  //     .toUpperCase()
  //     .split('')
  //     .map(char => 127397 + char.charCodeAt());
  //   return String.fromCodePoint(...codePoints);
  // };
function City() {
  const { id } = useParams();
  const { getCity, currentCity, isLoading } = useCities();
  
  useEffect(() => {
    getCity(id);
  }, [id]);
  
  if (isLoading) return <Spinner />;
  if (!currentCity.cityName) return <Message message="城市数据加载中..." />;
  
  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          <span>{emoji}</span>
          {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
