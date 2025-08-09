import styles from "./Map.module.css";
import { useNavigate } from "react-router-dom";
import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesProvider.jsx";
import PropTypes from "prop-types";
import { useGeolocation } from "../hooks/useGeolocation.js";
import Button from "./Button.jsx";
import { useUrlPosition } from "../hooks/useUrlPosition.js";
function Map() {
  const [mapPosition, setMapPosition] = useState([
    40.46635901755316, -3.7133789062500004,
  ]);
  const { cities } = useCities();
  const {
    isLoading: isLoadingMap,
    position: geolocationPosition,
    getPosition,
    setPosition: setPositionGeolocation,
  } = useGeolocation();

  const [mapLat, mapLng] = useUrlPosition();

  useEffect(() => {
    if (mapLat && mapLng) setMapPosition([mapLat, mapLng]);
  }, [mapLng, mapLat]);

  useEffect(() => {
    if (geolocationPosition) {
      setMapPosition([geolocationPosition.lat, geolocationPosition.lng]);
    }
  }, [geolocationPosition]);

  return (
    <div className={styles.mapContainer}>
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
        {!geolocationPosition && (
          <Button type={"position"} onClick={getPosition}>
            {isLoadingMap ? "Loading..." : "USE YOUR POSITION"}
          </Button>
        )}
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>{city.emoji}</span>
              <span>{city.cityName}</span>
            </Popup>
          </Marker>
        ))}
        <SetMapView position={mapPosition} />
        <ClickMap onSetPosition={setPositionGeolocation} />
      </MapContainer>
    </div>
  );
}
function SetMapView({ position }) {
  const map = useMap();
  useEffect(() => {
    map.setView(position);
  }, [position, map]);
  return null;
}
SetMapView.propTypes = {
  position: PropTypes.array,
};

function ClickMap({ onSetPosition }) {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => {
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
      onSetPosition(null);
    },
  });
  return null;
}

ClickMap.propTypes = {
  onSetPosition: PropTypes.func,
};

export default Map;
