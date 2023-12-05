import React, { useState } from "react";
import styles from "../styles/PlanTypeCheckItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const PlanTypeCheckItem = ({ item }) => {
  const [checked, setChecked] = useState(true);

  const changeChecked = () => {
    setChecked((checked) => !checked);
  };

  return (
    <div className={styles.item} onClick={changeChecked}>
      <div
        className={`${
          checked
            ? `${styles.checkbox} ${styles.checked}`
            : `${styles.checkbox}`
        }`}
        style={checked ? { background: item.color } : {}}
      >
        <FontAwesomeIcon icon={faCheck} className={styles.checked_icon} />
      </div>
      <span>{item.planType}</span>
    </div>
  );
};

export default PlanTypeCheckItem;
