import { useEffect, useState } from "react";
import { CountryInfo } from "./CountryInfo";

export const Main = () => {
  const [countryName, setCountryName] = useState<string>("");
  const [country, setCountry] = useState(null);
  console.log(country && country[0]?.name);

  //   const { region, capital } = country ? country[0] : "";

  const lowerCase = (string) => {
    const lower = string.toLowerCase();
    return lower;
  };

  useEffect(
    function () {
      const fetchCountry = async () => {
        const res = await fetch(
          `https://restcountries.com/v3.1/name/${countryName}`
        );
        const data = await res.json();
        setCountry(data);
      };
      fetchCountry();
    },
    [countryName]
  );

  return (
    <div className="main-container">
      <h1>World Chart</h1>
      <form action="">
        <input
          type="text"
          onChange={(e) => setCountryName(lowerCase(e.target.value))}
        />
        {country && <CountryInfo info={country[0]}></CountryInfo>}
      </form>
    </div>
  );
};
