import { useEffect, useState } from "react";
import styles from "../../css/Modal.module.css";

const LASTYEAR = new Date().getFullYear() - 1;
const TENYEARSAGO = LASTYEAR - 10;

export const Modal = ({ toggleModal, selectedCountry }) => {
  const [error, setError] = useState();
  const [gdp, setGdp] = useState(null);
  console.log(LASTYEAR);
  console.log(TENYEARSAGO);
  console.log(gdp);

  const {
    name: { common },
    cca2,
    capital,
    region,
    population,
    flags: { svg },
  } = selectedCountry;

  useEffect(
    function () {
      const fetchWorldBank = async () => {
        try {
          setError(null);
          const res = await fetch(
            `https://api.worldbank.org/v2/country/${cca2}/indicator/NY.GDP.MKTP.CD?format=json&date=${TENYEARSAGO}:${LASTYEAR}&per_page=100`
          );
          if (!res.ok) {
            throw new Error(`HTPP error! Status:${res.status}`);
          }
          const data = await res.json();
          setGdp(data[1]);
        } catch (err) {
          setError(err.message);
          setGdp(null);
        }
      };

      fetchWorldBank();
    },
    [setError, setGdp, cca2]
  );

  return (
    <>
      <div className={styles.overlay} onClick={toggleModal}>
        <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
          <h2>{common}</h2>
          <p>Click outside or the button to close.</p>
          <button onClick={toggleModal}>Close</button>
        </div>
      </div>
    </>
  );
};
