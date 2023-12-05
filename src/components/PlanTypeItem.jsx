import React from "react";
import styles from "../styles/PlanTypeItem.module.css";

const PlanTypeItem = ({ item, changePlanType }) => {
  return (
    <div className={styles.item} onClick={changePlanType}>
      <div className={styles.colorbox}></div>
      <span>{item.planType}</span>
    </div>
  );
};

export default PlanTypeItem;
