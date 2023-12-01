import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "../styles/AddPlanPopup.module.css";

const AddPlanPopup = (props) => {
  return (
    <div className={styles.add_plan_popup}>
      <p className={styles.title}>일정 이름</p>
      <div className={styles.input_container}>
        <input type="text" readOnly="readonly" />
        <div className={styles.select_button}>
          <div className={styles.colorbox}></div>
          <FontAwesomeIcon icon={faChevronDown} className={styles.icon} />
        </div>
      </div>
      <div className={styles.date_select_container}></div>
    </div>
  );
};

export default AddPlanPopup;
