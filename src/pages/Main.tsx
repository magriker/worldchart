import { useEffect, useState } from "react";
import { CountryInfo } from "./components/CountryInfo";
import { Modal } from "./components/Modal";

export const Main = () => {
  const [countryName, setCountryName] = useState<string>("");
  const [countries, setCountry] = useState(null);
  const [error, setError] = useState();
  const [isModalopen, setIsModalOpen] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState();

  const toggleModal = () => {
    setIsModalOpen(!isModalopen);
  };
  console.log(countries && countries);

  const lowerCase = (string) => {
    const lower = string.toLowerCase();
    return lower;
  };

  useEffect(
    function () {
      const fetchCountry = async () => {
        try {
          setError(null);
          const res = await fetch(
            `https://restcountries.com/v3.1/name/${countryName}`
          );

          if (!res.ok) {
            throw new Error(`HTPP error! Status:${res.status}`);
          }

          const data = await res.json();
          setCountry(data);
        } catch (err) {
          setError(err.message);
          setCountry(null);
        }
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
        {error && <p>{error}</p>}
        {countries && (
          <CountryInfo
            countries={countries}
            toggleModal={toggleModal}
            setSelectedCountry={setSelectedCountry}
          ></CountryInfo>
        )}
      </form>
      {isModalopen && (
        <Modal
          toggleModal={toggleModal}
          selectedCountry={selectedCountry}
        ></Modal>
      )}
    </div>
  );
};
