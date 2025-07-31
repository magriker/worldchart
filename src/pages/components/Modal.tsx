import { useEffect, useState } from "react";
import styles from "../../css/Modal.module.css";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const LASTYEAR = new Date().getFullYear() - 1;
const TENYEARSAGO = LASTYEAR - 10;

export const Modal = ({ toggleModal, selectedCountry }) => {
  const [error, setError] = useState();
  const [gdp, setGdp] = useState();
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
          const simplified = data[1]
            .filter((item) => item.value !== null)
            .map(({ date, value }) => ({ year: date, gdp: value }))
            .reverse();
          setGdp(simplified);
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
          <div>
            <h3>GDP</h3>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={gdp}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis
                  tickFormatter={(val) =>
                    `$${(val / 1_000_000_000_000).toFixed(1)}T`
                  }
                />
                <Tooltip
                  formatter={(val) => `$${Number(val).toLocaleString()}`}
                />
                <Line
                  type="monotone"
                  dataKey="gdp"
                  stroke="#8884d8"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>

          <button onClick={toggleModal}>Close</button>
        </div>
      </div>
    </>
  );
};
