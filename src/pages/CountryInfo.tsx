import { CountryCard } from "./CountryCard";
import styles from "../css/CountryInfo.module.css";
import { useState } from "react";

export const CountryInfo = ({ countries }) => {
  const [isModalopen, setIsModalOpen] = useState(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalopen);
  };

  if (!countries) return;
  console.log(countries);
  return (
    <div>
      <h1>Country info</h1>
      <div className={styles.cardBox}>
        {countries.map((country) => (
          <CountryCard
            country={country}
            toggleModal={toggleModal}
          ></CountryCard>
        ))}
      </div>
    </div>
  );
};
