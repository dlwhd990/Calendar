import ContentContainer from "../components/ContentContainer";
import Header from "../components/Header";
import styles from "../styles/Mainpage.module.css";

const Mainpage = ({
  tab,
  onTabClick,
  selectedDate,
  settingSelectedDate,
  showDate,
  setShowDate,
}) => {
  return (
    <div className={styles.mainpage}>
      <Header tab={tab} onTabClick={onTabClick} />
      <ContentContainer
        selectedDate={selectedDate}
        settingSelectedDate={settingSelectedDate}
        showDate={showDate}
        setShowDate={setShowDate}
      />
    </div>
  );
};

export default Mainpage;
