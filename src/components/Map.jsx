import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap, useMapEvents } from "react-leaflet";
import styles from "./Map.module.css";
import { useCities } from "../context/CitiesContext";
import { useGeolocation } from "../hooks/useGeolocation";
import Button from "./Button";
import { useUrlPosition } from "../hooks/useUrlPosition";

function Map() {
  const navigate = useNavigate();
  // 设置默认位置
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const { cities } = useCities();
  
  // 获取 URL 参数中的经纬度
  const [lat, lng] = useUrlPosition();
  
  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  // 当获取到地理位置时更新地图位置
  useEffect(() => {
    if (geolocationPosition)
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
  }, [geolocationPosition]);

  // 当 URL 参数中有经纬度时更新地图位置
  useEffect(() => {
    if (lat && lng) setMapPosition([lat, lng]);
  }, [lat, lng]);

  return (
    <div className={styles.mapContainer}>
      <Button type="position" onClick={getPosition}>
        {isLoadingPosition ? "Loading..." : "Use your position"}
      </Button>
      <MapContainer
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
        className={styles.map}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        
        {cities.map((city) => (
          <Marker
            key={city.id}
            position={[city.position.lat, city.position.lng]}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}

        <ChangeCenter position={mapPosition} />
        <MapEvents />
      </MapContainer>
    </div>
  );
}

// 用于更新地图中心的组件
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}

function MapEvents() {
  const navigate = useNavigate();
  const map = useMapEvents({
    click: async (e) => {
      const baseUrl = "https://api.bigdatacloud.net/data/reverse-geocode-client";
      const res = await fetch(`${baseUrl}?latitude=${e.latlng.lat}&longitude=${e.latlng.lng}`);
      const data = await res.json();
      if (data.city === "" || data.countryName === "") {
        alert("This is not a city yet, sorry.");
      } else {
        navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      }
    },
  });
  return null;
}

export default Map;
