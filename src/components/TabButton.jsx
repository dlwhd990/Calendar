import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/TabButton.module.css";

const TabButton = ({ icon, callback, selected, tabName }) => {
  return (
    <button
      onClick={callback}
      className={`${
        selected === tabName
          ? `${styles.button} ${styles.selected}`
          : `${styles.button}`
      }`}
    >
      <FontAwesomeIcon icon={icon} className={styles.icon} />
    </button>
  );
};

export default TabButton;
