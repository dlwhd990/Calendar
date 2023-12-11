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
  totalTime,
  successRate,
  changeSuccessRate,
  successMsg,
  changeSuccessMsg,
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
          changeSuccessRate={changeSuccessRate}
          changeSuccessMsg={changeSuccessMsg}
        />
      </div>
      <div className={styles.right}>
        <TwoRight
          loadDayPlanList={loadDayPlanList}
          selectedDate={selectedDate}
          planTypeList={planTypeList}
          totalTime={totalTime}
          successRate={successRate}
          successMsg={successMsg}
        />
      </div>
    </main>
  );
};

export default MainTwo;
