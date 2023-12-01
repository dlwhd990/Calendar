import styles from "../styles/OneMiddle.module.css";
import BigCalendar from "./BigCalendar";

const OneMiddle = ({
  selectedDate,
  settingSelectedDate,
  showDate,
  setShowDate,
  addPlanPopupOn,
  settingAddPlanPopupOn,
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
      />
    </section>
  );
};

export default OneMiddle;
