// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState, useEffect } from "react";
import Button from "./Button";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useCities } from "../context/CitiesContext";
export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

function Form() {
  const navigate = useNavigate();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [date, setDate] = useState(new Date());
  const [notes, setNotes] = useState("");
  const [lat, lng] = useUrlPosition();
  const {getCity, currentCity} = useCities();
  const [isLoading, setIsLoading] = useState(false);
  
  useEffect(() => {
    const baseUrl = "https://api.bigdatacloud.net/data/reverse-geocode-client";
    
    async function fetchCityData() {
      try {
        setIsLoading(true);
        const res = await fetch(`${baseUrl}?latitude=${lat}&longitude=${lng}`);
        const data = await res.json();
        
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    }
    
    if (lat && lng) fetchCityData();
  }, [lat, lng]);
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        {/* <span className={styles.flag}>{emoji}</span> */}
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <input
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
          
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="notes">Notes about your trip to {cityName}</label>
        <textarea
          id="notes"
          onChange={(e) => setNotes(e.target.value)}
          value={notes}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" onClick={(e) => {
          e.preventDefault();
          navigate(-1);
        }}>Add</Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
