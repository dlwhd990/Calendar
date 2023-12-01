import React from "react";
import styles from "../styles/PlanTypeItem.module.css";

const PlanTypeItem = (props) => {
  return (
    <div className={styles.item}>
      <div className={styles.item_colorbox}></div>
      <span>여가 시간</span>
    </div>
  );
};

export default PlanTypeItem;
