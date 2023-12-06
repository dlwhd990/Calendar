import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/OneRight.module.css";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import AddDayPlanPopup from "./AddDayPlanPopup";
import DayCalendar from "./DayCalendar";

const OneRight = ({
  selectedDate,
  planTypeList,
  dayPlanList,
  loadDayPlanList,
}) => {
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
            loadDayPlanList={loadDayPlanList}
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
      <DayCalendar
        showIndication={true}
        dayPlanList={dayPlanList}
        selectedDate={selectedDate}
        loadDayPlanList={loadDayPlanList}
      />
    </aside>
  );
};

export default OneRight;
