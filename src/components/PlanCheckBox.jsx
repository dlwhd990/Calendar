import React from "react";
import styles from "../styles/PlanCheckBox.module.css";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

const PlanCheckBox = ({ plan, loadPlanList }) => {
  const changeSuccess = (e) => {
    e.stopPropagation();

    const { cnt, ...original } = plan;

    axios //
      .patch("http://13.125.51.122:8080/plan/success/month", {
        ...original,
        success: original.success === 0 ? 1 : 0,
      })
      .then((res) => {
        console.log(res.data);
        loadPlanList();
      })
      .catch((err) => {
        console.error(err);
        alert("에러가 발생했습니다. 다시 시도해주세요.");
      });
  };

  return (
    <div className={styles.checkbox} onClick={changeSuccess}>
      <div
        className={`${
          plan.success === 1
            ? `${styles.checkbox} ${styles.checked}`
            : `${styles.checkbox}`
        }`}
        style={plan.success === 1 ? { background: plan.color } : {}}
      >
        <FontAwesomeIcon
          icon={faCheck}
          className={styles.checked_icon}
          style={plan.success === 1 ? { color: plan.color } : {}}
        />
      </div>
    </div>
  );
};

export default PlanCheckBox;
