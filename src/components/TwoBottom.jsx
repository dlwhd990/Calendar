import React from "react";
import styles from "../styles/TwoBottom.module.css";

const TwoBottom = (props) => {
  const onRangeChange = (e) => {
    console.log(e.target.value);
  };
  return (
    <div className={styles.bottom}>
      <input type="range" step="25" onChange={onRangeChange} />
    </div>
  );
};

export default TwoBottom;
