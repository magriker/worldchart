import { CountryCard } from "./CountryCard";
import styles from "../css/CountryInfo.module.css";

export const CountryInfo = ({ countries }) => {
  if (!countries) return;
  console.log(countries);
  return (
    <div>
      <h1>Country info</h1>
      <div className={styles.cardBox}>
        {countries.map((country) => (
          <CountryCard country={country}></CountryCard>
        ))}
      </div>
    </div>
  );
};
