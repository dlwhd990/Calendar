import React, { useState } from "react";
import styles from "../styles/PlanTypeCheckItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const PlanTypeCheckItem = (props) => {
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
      >
        <FontAwesomeIcon icon={faCheck} className={styles.checked_icon} />
      </div>
      <span>여가 시간</span>
    </div>
  );
};

export default PlanTypeCheckItem;
