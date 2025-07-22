export const CountryInfo = ({ info }) => {
  const {
    name: { common, official },
    capital,
    region,
  } = info;
  console.log(info);

  return (
    <div>
      <h1>Country info</h1>
      <p>{common}</p>
    </div>
  );
};
