import styles from "./Map.module.css";
import { useSearchParams, useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from 'react-leaflet';
import { useState, useEffect } from "react";
import { useCities } from "../context/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
export default function Map() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [mapPosition, setMapPosition] = useState([41.890210, 12.492373]);
  const {isLoading: isLoadingGeolocation, position: geolocationPosition, error: geolocationError, getPosition: getGeolocationPosition} = useGeolocation();
  // 将字符串转换为数字
  const lat = parseFloat(searchParams.get("lat")) || mapPosition[0];
  const lng = parseFloat(searchParams.get("lng")) || mapPosition[1];
  const {cities} = useCities();
  useEffect(() => {
    if(geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }
  }, [geolocationPosition]);
useEffect(() => {
  if(lat && lng) setMapPosition([lat, lng]);
}, [lat, lng]);
  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getGeolocationPosition}>{isLoadingGeolocation ? "Loading..." : "Use your position"}</Button>
      <MapContainer 
        center={[lat, lng]} 
        zoom={13} 
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {lat && lng && (
          cities.map(city => (
            <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
              <Popup>{city.cityName}</Popup>
            </Marker>
          ))
        )}
        <ChangeCenter position={[lat, lng]} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}
function ChangeCenter({position}){
  const map = useMap();
  map.setView(position, 13);
  return null;
}
  function DetectClick(){
  const navigate = useNavigate();
  useMapEvents({
    click: e => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  })
  return null;
}
