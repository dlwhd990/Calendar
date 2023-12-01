import ContentContainer from "../components/ContentContainer";
import Header from "../components/Header";
import styles from "../styles/Mainpage.module.css";

const Mainpage = ({
  selectedDate,
  settingSelectedDate,
  showDate,
  setShowDate,
  addPlanPopupOn,
  settingAddPlanPopupOn,
}) => {
  return (
    <div className={styles.mainpage}>
      <ContentContainer
        selectedDate={selectedDate}
        settingSelectedDate={settingSelectedDate}
        showDate={showDate}
        setShowDate={setShowDate}
        addPlanPopupOn={addPlanPopupOn}
        settingAddPlanPopupOn={settingAddPlanPopupOn}
      />
    </div>
  );
};

export default Mainpage;
