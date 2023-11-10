import styles from "../styles/OneLeft.module.css";
import Calendar from "./Calendar";

const OneLeft = ({
  selectedDate,
  settingSelectedDate,
  showDate,
  setShowDate,
}) => {
  return (
    <aside className={styles.left}>
      <Calendar
        selectedDate={selectedDate}
        settingSelectedDate={settingSelectedDate}
        showDate={showDate}
        setShowDate={setShowDate}
      />
    </aside>
  );
};

export default OneLeft;
