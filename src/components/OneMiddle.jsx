import styles from "../styles/OneMiddle.module.css";
import BigCalendar from "./BigCalendar";

const OneMiddle = ({
  selectedDate,
  settingSelectedDate,
  showDate,
  setShowDate,
  addPlanPopupOn,
  settingAddPlanPopupOn,
  planList,
  planTypeList,
  selectedTypeList,
  loadPlanList,
}) => {
  return (
    <section className={styles.middle}>
      <BigCalendar
        selectedDate={selectedDate}
        settingSelectedDate={settingSelectedDate}
        showDate={showDate}
        setShowDate={setShowDate}
        addPlanPopupOn={addPlanPopupOn}
        settingAddPlanPopupOn={settingAddPlanPopupOn}
        planList={planList}
        planTypeList={planTypeList}
        selectedTypeList={selectedTypeList}
        loadPlanList={loadPlanList}
      />
    </section>
  );
};

export default OneMiddle;
