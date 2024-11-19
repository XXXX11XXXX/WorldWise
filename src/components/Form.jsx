// "https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=0&longitude=0"

import { useState, useEffect } from "react";
import Button from "./Button";
import styles from "./Form.module.css";
import { useNavigate } from "react-router-dom";
import BackButton from "./BackButton";
import { useUrlPosition } from "../hooks/useUrlPosition";
import { useCities } from "../context/CitiesContext";
import Message from "./Message";
import Spinner from "./Spinner";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
export function convertToEmoji(countryCode) {
  const code = countryCode.slice(0, 2);
  const codePoints = code
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
  const {createCity, isLoading: isLoadingCity} = useCities();
  const [isLoadingGeocoding, setIsLoadingGeocoding] = useState(false);
  
  useEffect(() => {
    const baseUrl = "https://api.bigdatacloud.net/data/reverse-geocode-client";
    
    async function fetchCityData() {
      try {
        setIsLoadingGeocoding(true);
        const normalizedLng = lng > 180 ? lng - 360 : lng;
        
        const res = await fetch(
          `${baseUrl}?latitude=${lat}&longitude=${normalizedLng}`
        );
        const data = await res.json();
        
        setCityName(data.city || data.locality || "");
        setCountry(data.countryName);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoadingGeocoding(false);
      }
    }
    
    if (lat && lng) fetchCityData();
  }, [lat, lng]);
  if (isLoadingGeocoding) return <Spinner />;
  if (!lat && !lng) return <Message message="Start by clicking on a city or by entering a country name" />;
async function handleSubmit(e){
  e.preventDefault();
  if(!cityName || !date) return;
  
  const countryCode = country.slice(0, 2);
  
  const newCity = {
    cityName,
    country,
    date,
    notes,
    position: {lat, lng},
    emoji: convertToEmoji(countryCode),
  };
  await createCity(newCity);
  navigate("/app/cities");
}
  return (
    <form className={`${styles.form} ${isLoadingGeocoding ? styles.loading : ""}`} onSubmit={handleSubmit}>
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
        <DatePicker
          id="date"
          onChange={(e) => setDate(e.target.value)}
          value={date}
          selected={date}
          dateFormat="dd/MM/yyyy"
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
        <Button type="primary" onClick={handleSubmit}>
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export default Form;
