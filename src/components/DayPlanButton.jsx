import React from "react";
import styles from "../styles/DayPlanButton.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DayPlanButton = ({ text, icon, callback }) => {
  return (
    <button className={styles.button} onClick={callback}>
      <span>{text}</span>
      <FontAwesomeIcon icon={icon} className={styles.icon} />
    </button>
  );
};

export default DayPlanButton;
