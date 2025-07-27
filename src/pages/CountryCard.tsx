import styles from "../css/CountryCard.module.css";

export const CountryCard = ({ country, setModal }) => {
  const {
    name: { common },
    capital,
    region,
    population,
    flags: { svg },
  } = country;
  console.log(country);

  return (
    <div className={styles.countryCard} onClick={}>
      <h2 className="">
        <strong>{common}</strong>
      </h2>
      <img src={svg} alt="country flag" className={styles.flag} />
      <p>
        The region🌏: <strong>{region}</strong>
      </p>
      <p>
        The capital city🏙️: <strong>{capital}</strong>
      </p>
      <p>
        The population🧑‍🤝‍🧑: <strong>{population.toLocaleString()}</strong>
      </p>
    </div>
  );
};
