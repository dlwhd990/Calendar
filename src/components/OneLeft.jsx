import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "../styles/OneLeft.module.css";
import Calendar from "./Calendar";
import PlanTypeCheckItem from "./PlanTypeCheckItem";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const OneLeft = ({
  selectedDate,
  settingSelectedDate,
  showDate,
  setShowDate,
  planTypeList,
}) => {
  return (
    <aside className={styles.left}>
      <Calendar
        selectedDate={selectedDate}
        settingSelectedDate={settingSelectedDate}
        showDate={showDate}
        setShowDate={setShowDate}
      />
      <div className={styles.plan_type_container}>
        <button className={styles.plus_button}>
          <FontAwesomeIcon icon={faPlus} className={styles.plus_icon} />
        </button>
        <p>일정 타입</p>
        <div className={styles.plan_type_list}>
          {planTypeList.map((item) => (
            <PlanTypeCheckItem key={item.title} item={item} />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default OneLeft;
