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
import { PieChart, Pie, Cell } from "recharts";

const LASTYEAR = new Date().getFullYear() - 1;
const TENYEARSAGO = LASTYEAR - 10;
const indicators = {
  children: "SP.POP.0014.TO.ZS",
  working: "SP.POP.1564.TO.ZS",
  elderly: "SP.POP.65UP.TO.ZS",
};
const colors = ["#82ca9d", "#8884d8", "#ffbb28"];

export const Modal = ({ toggleModal, selectedCountry }) => {
  const [error, setError] = useState();
  const [gdp, setGdp] = useState();
  const [populationForGeneration, setPopulationForGeneration] = useState([]);
  console.log(gdp);
  console.log(populationForGeneration);

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
          console.log(simplified);

          setGdp(simplified);
        } catch (err) {
          setError(err.message);
          setGdp(null);
        }
      };

      const fetchPopulationForGeneration = async () => {
        const fetchIndicator = async (code) => {
          try {
            setError(null);
            const res = await fetch(
              `https://api.worldbank.org/v2/country/JP/indicator/${code}?format=json&date=${LASTYEAR}&per_page=1`
            );
            if (!res.ok) {
              throw new Error(`HTPP error! Status:${res.status}`);
            }
            const json = await res.json();
            return json[1]?.[0]?.value || 0;
          } catch (err) {
            setError(err.message);
            setPopulationForGeneration([]);
          }
        };

        const [children, working, elderly] = await Promise.all([
          fetchIndicator(indicators.children),
          fetchIndicator(indicators.working),
          fetchIndicator(indicators.elderly),
        ]);

        setPopulationForGeneration([
          { name: "Children (0–14)", value: children },
          { name: "Working Age (15–64)", value: working },
          { name: "Elderly (65+)", value: elderly },
        ]);
      };

      fetchWorldBank();
      fetchPopulationForGeneration();
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
            {error ? (
              <p>{error}</p>
            ) : (
              <ResponsiveContainer width="100%" height={400}>
                <LineChart
                  data={gdp}
                  margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="year" />
                  <YAxis
                    tickFormatter={(val) => {
                      if (val >= 1_000_000_000_000) {
                        return `$${(val / 1_000_000_000_000).toFixed(1)}T`;
                      } else if (val >= 1_000_000_000) {
                        return `$${(val / 1_000_000_000).toFixed(1)}B`;
                      } else {
                        return `$${val.toLocaleString()}`;
                      }
                    }}
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
            )}
          </div>
          <div>
            <h3>Population</h3>
            <ResponsiveContainer width="100%" height={400}>
              <PieChart>
                <Pie
                  data={populationForGeneration}
                  dataKey="value"
                  nameKey="name"
                  outerRadius={130}
                  label
                >
                  {populationForGeneration.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={colors[index % colors.length]}
                    />
                  ))}
                </Pie>
                <Tooltip formatter={(val) => `${val.toFixed(1)}%`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <button onClick={toggleModal}>Close</button>
        </div>
      </div>
    </>
  );
};
