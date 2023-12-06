import React from "react";
import TwoLeft from "../components/TwoLeft";
import TwoBottom from "../components/TwoBottom";
import TwoRight from "../components/TwoRight";
import styles from "../styles/MainTwo.module.css";

const MainTwo = ({
  selectedDate,
  dayPlanList,
  loadDayPlanList,
  originDayPlanList,
  selectedTypeList,
}) => {
  return (
    <main className={styles.mainpage}>
      <div className={styles.left}>
        <TwoLeft
          selectedDate={selectedDate}
          dayPlanList={dayPlanList}
          loadDayPlanList={loadDayPlanList}
          originDayPlanList={originDayPlanList}
          selectedTypeList={selectedTypeList}
        />
        <TwoBottom />
      </div>
      <div className={styles.right}>
        <TwoRight />
      </div>
    </main>
  );
};

export default MainTwo;
