import styles from "../styles/ContentContainer.module.css";
import OneLeft from "./OneLeft";
import OneMiddle from "./OneMiddle";
import OneRight from "./OneRight";

const ContentContainer = ({
  selectedDate,
  settingSelectedDate,
  showDate,
  setShowDate,
}) => {
  return (
    <section className={styles.container}>
      <OneLeft
        selectedDate={selectedDate}
        settingSelectedDate={settingSelectedDate}
        showDate={showDate}
        setShowDate={setShowDate}
      />
      <OneMiddle
        selectedDate={selectedDate}
        settingSelectedDate={settingSelectedDate}
        showDate={showDate}
        setShowDate={setShowDate}
      />
      <OneRight />
    </section>
  );
};

export default ContentContainer;
