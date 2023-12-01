import styles from "../styles/ContentContainer.module.css";
import OneLeft from "./OneLeft";
import OneMiddle from "./OneMiddle";
import OneRight from "./OneRight";

const ContentContainer = ({
  selectedDate,
  settingSelectedDate,
  showDate,
  setShowDate,
  addPlanPopupOn,
  settingAddPlanPopupOn,
  planTypeList,
}) => {
  return (
    <section className={styles.container}>
      <OneLeft
        selectedDate={selectedDate}
        settingSelectedDate={settingSelectedDate}
        showDate={showDate}
        setShowDate={setShowDate}
        planTypeList={planTypeList}
      />
      <OneMiddle
        selectedDate={selectedDate}
        settingSelectedDate={settingSelectedDate}
        showDate={showDate}
        setShowDate={setShowDate}
        addPlanPopupOn={addPlanPopupOn}
        settingAddPlanPopupOn={settingAddPlanPopupOn}
        planTypeList={planTypeList}
      />
      <OneRight />
    </section>
  );
};

export default ContentContainer;
