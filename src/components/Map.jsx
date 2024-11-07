import styles from "./Map.module.css";
import { useSearchParams, useNavigate } from "react-router-dom";
export default function Map() {
  const navigate = useNavigate();
  const[searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  return <div className={styles.mapContainer} onClick={() => {
    navigate("form");
    
  }}>
    <h1>Map</h1>
    <p>Latitude: {lat}</p>
    <p>Longitude: {lng}</p>
    <button className={styles.btn} onClick={() => setSearchParams({ lat: 12.492373, lng: 41.890210 })}>
      Reset position
    </button>
  </div>;
}
