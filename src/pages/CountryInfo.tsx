import { CountryCard } from "./CountryCard";
import styles from "../css/CountryInfo.module.css";
import { useState } from "react";

export const CountryInfo = ({ countries }) => {
  const [modal, setModal] = useState(false);

  if (!countries) return;
  console.log(countries);
  return (
    <div>
      <h1>Country info</h1>
      <div className={styles.cardBox}>
        {countries.map((country) => (
          <CountryCard country={country} setModal={setModal}></CountryCard>
        ))}
      </div>
    </div>
  );
};
