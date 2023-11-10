import styles from "../styles/OneMiddle.module.css";
import BigCalendar from "./BigCalendar";

const OneMiddle = ({
  selectedDate,
  settingSelectedDate,
  showDate,
  setShowDate,
}) => {
  return (
    <section className={styles.middle}>
      <BigCalendar
        selectedDate={selectedDate}
        settingSelectedDate={settingSelectedDate}
        showDate={showDate}
        setShowDate={setShowDate}
      />
    </section>
  );
};

export default OneMiddle;
