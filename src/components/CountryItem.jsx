import styles from "./CountryItem.module.css";
import PropTypes from "prop-types";

function CountryItem({ country: { country, emoji } }) {
  return (
    <li className={styles.countryItem}>
      <span>{emoji}</span>
      <span>{country}</span>
    </li>
  );
}

CountryItem.propTypes = {
  country: PropTypes.object,
};

export default CountryItem;
