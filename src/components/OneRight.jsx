import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/OneRight.module.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import AddDayPlanPopup from "./AddDayPlanPopup";

const OneRight = ({ selectedDate, planTypeList }) => {
  const [showPopup, setShowPopup] = useState(false);

  const changeShowPopup = () => {
    setShowPopup((showPopup) => !showPopup);
  };

  return (
    <aside className={styles.right}>
      <div className={styles.top}>
        {showPopup && (
          <AddDayPlanPopup
            planTypeList={planTypeList}
            selectedDate={selectedDate}
            closePopup={changeShowPopup}
          />
        )}
        <button className={styles.button} onClick={changeShowPopup}>
          <FontAwesomeIcon icon={faPlus} className={styles.icon} />
        </button>
        <p className={styles.top_date}>{`${selectedDate.year}.${(
          selectedDate.month + 1
        )
          .toString()
          .padStart(2, "0")}.${selectedDate.date
          .toString()
          .padStart(2, "0")}`}</p>
        <p className={styles.top_title}>Time Table</p>
      </div>
    </aside>
  );
};

export default OneRight;
