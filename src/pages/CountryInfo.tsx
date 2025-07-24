import styles from "../css/CountryInfo.module.css";

export const CountryInfo = ({ info }) => {
  if (!info) return;
  const {
    name: { common },
    capital,
    region,
    population,
    flags: { svg },
  } = info;
  console.log(info);

  //   function getFlagEmoji(code) {
  //     return code
  //       .toUpperCase()
  //       .split("")
  //       .map((char) => String.fromCodePoint(char.codePointAt(0) + 127397))
  //       .join("");
  //   }

  //   const flagimg = getFlagEmoji(flag);

  return (
    <div>
      <h1>Country info</h1>
      <p>
        The country's name: <strong>{common}</strong>
        <div>
          <p>Flag</p>
          <img src={svg} alt="country flag" className={styles.flag} />
        </div>
      </p>
      <p>
        The region of the country: <strong>{region}</strong>
      </p>
      <p>
        The capital of the country: <strong>{capital}</strong>
      </p>
      <p>
        The population of the country:{" "}
        <strong>{population.toLocaleString()}</strong>
      </p>
    </div>
  );
};
