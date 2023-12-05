import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/OneLeft.module.css";
import Calendar from "./Calendar";
import PlanTypeCheckItem from "./PlanTypeCheckItem";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import AddPlanType from "./AddPlanType";

const OneLeft = ({
  selectedDate,
  settingSelectedDate,
  showDate,
  setShowDate,
  planTypeList,
  selectedTypeList,
  changeSelectedTypeList,
}) => {
  const [showPopup, setShowPopup] = useState(false);

  const changePopup = () => {
    setShowPopup((showPopup) => !showPopup);
  };
  return (
    <aside className={styles.left}>
      <Calendar
        selectedDate={selectedDate}
        settingSelectedDate={settingSelectedDate}
        showDate={showDate}
        setShowDate={setShowDate}
      />
      <div className={styles.plan_type_container}>
        {showPopup && <AddPlanType changePopup={changePopup} />}
        <button className={styles.plus_button} onClick={changePopup}>
          <FontAwesomeIcon icon={faPlus} className={styles.plus_icon} />
        </button>
        <p>일정 타입</p>
        <div className={styles.plan_type_list}>
          {planTypeList.map((item) => (
            <PlanTypeCheckItem
              key={item.planType}
              item={item}
              selectedTypeList={selectedTypeList}
              changeSelectedTypeList={changeSelectedTypeList}
            />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default OneLeft;
