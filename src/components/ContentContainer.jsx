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
  planList,
  planTypeList,
  selectedTypeList,
  changeSelectedTypeList,
}) => {
  return (
    <section className={styles.container}>
      <OneLeft
        selectedDate={selectedDate}
        settingSelectedDate={settingSelectedDate}
        showDate={showDate}
        setShowDate={setShowDate}
        planTypeList={planTypeList}
        selectedTypeList={selectedTypeList}
        changeSelectedTypeList={changeSelectedTypeList}
      />
      <OneMiddle
        selectedDate={selectedDate}
        settingSelectedDate={settingSelectedDate}
        showDate={showDate}
        setShowDate={setShowDate}
        addPlanPopupOn={addPlanPopupOn}
        settingAddPlanPopupOn={settingAddPlanPopupOn}
        planList={planList}
        planTypeList={planTypeList}
        selectedTypeList={selectedTypeList}
      />
      <OneRight selectedDate={selectedDate} planTypeList={planTypeList} />
    </section>
  );
};

export default ContentContainer;
