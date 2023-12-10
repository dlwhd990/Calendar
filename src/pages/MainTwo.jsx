import React from "react";
import TwoLeft from "../components/TwoLeft";
import TwoBottom from "../components/TwoBottom";
import TwoRight from "../components/TwoRight";
import styles from "../styles/MainTwo.module.css";

const MainTwo = ({
  selectedDate,
  dayPlanList,
  loadDayPlanList,
  selectedTypeList,
  planTypeList,
  settingSelectedDate,
}) => {
  return (
    <main className={styles.mainpage}>
      <div className={styles.left}>
        <TwoLeft
          selectedDate={selectedDate}
          dayPlanList={dayPlanList}
          loadDayPlanList={loadDayPlanList}
          selectedTypeList={selectedTypeList}
          settingSelectedDate={settingSelectedDate}
        />
      </div>
      <div className={styles.right}>
        <TwoRight
          loadDayPlanList={loadDayPlanList}
          selectedDate={selectedDate}
          planTypeList={planTypeList}
        />
      </div>
    </main>
  );
};

export default MainTwo;
