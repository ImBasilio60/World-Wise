import styles from "./Map.module.css";
import { useNavigate, useSearchParams } from "react-router-dom";
function Map() {
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");

  const navigate = useNavigate();
  return (
    <div className={styles.mapContainer} onClick={() => navigate("form")}>
      <h1>
        Map {lat} : {lng}
      </h1>
      <button
        onClick={() => {
          setSearchParams({ lat: "25", lng: "26" });
        }}
      >
        Set
      </button>
    </div>
  );
}

export default Map;
