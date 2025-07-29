import styles from "../../css/Modal.module.css";

export const Modal = ({ toggleModal, selectedCountry }) => {
  const {
    name: { common },
    capital,
    region,
    population,
    flags: { svg },
  } = selectedCountry;

  return (
    <>
      <div className={styles.overlay}>
        <div className={styles.modal}>
          <h2>{common}</h2>
          <p>Click outside or the button to close.</p>
          <button onClick={toggleModal}>Close</button>
        </div>
      </div>
    </>
  );
};
