import React from "react";
import styles from "../styles/PlanTypeItem.module.css";

const PlanTypeItem = ({ changePlanType }) => {
  return (
    <div className={styles.item} onClick={changePlanType}>
      <div className={styles.colorbox}></div>
      <span>여가 시간</span>
    </div>
  );
};

export default PlanTypeItem;
