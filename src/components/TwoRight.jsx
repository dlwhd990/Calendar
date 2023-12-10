import React, { useState } from "react";
import styles from "../styles/TwoRight.module.css";
import { faCalendar, faClock } from "@fortawesome/free-regular-svg-icons";
import DayPlanButton from "./DayPlanButton";
import AddDayPlanPopup from "./AddDayPlanPopup";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "axios";

// http://13.125.51.122:8083/api/plans/auto/{아이디}/{설정}

// 공부 : 1
// 운동 : 6
// 휴식 : 3
// 설정 없을 때(기본값) : 9

const TwoRight = ({ loadDayPlanList, selectedDate, planTypeList }) => {
  const [showFixPopup, setShowFixPopup] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [selected, setSelected] = useState(1);

  const changeSelect = (target) => {
    setSelected(target);
  };

  const changeShowFixPopup = () => {
    setShowPopup(false);
    setShowFixPopup((showFixPopup) => !showFixPopup);
  };

  const changeShowPopup = () => {
    setShowFixPopup(false);
    setShowPopup((showPopup) => !showPopup);
  };

  const onSubmitHandler = () => {
    axios
      .get(
        `http://13.125.51.122:8083/api/plans/auto/${localStorage.getItem(
          "userId"
        )}/${selected}`
      )
      .then((res) => {
        const result = [];
        // let body;

        // let tmp = res.data.slice(1, res.data.length - 2).split("}, {");
        // console.log(tmp);
        // tmp.forEach((item, idx) => {
        //   if (idx === 0) {
        //     tmp[idx] = item + "}";
        //   } else {
        //     tmp[idx] = "{" + item + "}";
        //   }
        // });
        // body = [];
        // tmp.forEach((item) => {
        //   console.log("DAS", item);
        //   body.push(JSON.parse(item));
        // });

        // console.log(body);

        res.data.forEach((item) => {
          const start = `${selectedDate.year}-${(selectedDate.month + 1)
            .toString()
            .padStart(2, "0")}-${selectedDate.date
            .toString()
            .padStart(2, "0")}T${item.startTime}:00`;

          const end = `${selectedDate.year}-${(selectedDate.month + 1)
            .toString()
            .padStart(2, "0")}-${selectedDate.date
            .toString()
            .padStart(2, "0")}T${item.endTime}:00`;

          const color = planTypeList.filter((t) => t.planType === item.type)[0]
            .color;

          const data = {
            planName: item.type,
            planType: item.type,
            start,
            end,
            color,
            plan: "유동",
            dayOfWeek: "",
            success: 0,
          };

          result.push(data);
        });
        console.log(result);
        return axios.post("http://13.125.51.122:8080/plan/day/add", result);
      })
      .then((res) => {
        console.log(res);
        loadDayPlanList();
      })
      .catch((err) => console.error(err));
  };

  return (
    <div className={styles.right}>
      <div>
        <div className={styles.container}>
          <DayPlanButton
            text="고정 일정 추가"
            icon={faCalendar}
            callback={changeShowFixPopup}
          />
          <div className={styles.popup_container}>
            {showFixPopup && (
              <AddDayPlanPopup
                planTypeList={planTypeList}
                selectedDate={selectedDate}
                closePopup={changeShowFixPopup}
                loadDayPlanList={loadDayPlanList}
                flag="고정"
              />
            )}
          </div>
        </div>
        <div className={styles.container}>
          <DayPlanButton
            text="유동 일정 추가"
            icon={faClock}
            callback={changeShowPopup}
          />
          <div className={styles.popup_container}>
            {showPopup && (
              <AddDayPlanPopup
                planTypeList={planTypeList}
                selectedDate={selectedDate}
                closePopup={changeShowPopup}
                loadDayPlanList={loadDayPlanList}
                flag="유동"
              />
            )}
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <p className={styles.auto_title}>자동 플랜 설정</p>

        <div
          className={styles.checkbox_container}
          onClick={() => changeSelect(1)}
        >
          <input
            type="radio"
            name="planType"
            checked={selected === 1}
            onChange={() => changeSelect(1)}
          />
          <label>공부 위주 시간표</label>
        </div>
        <div
          className={styles.checkbox_container}
          onClick={() => changeSelect(6)}
        >
          <input
            type="radio"
            name="planType"
            checked={selected === 6}
            onChange={() => changeSelect(6)}
          />
          <label>운동 위주 시간표</label>
        </div>
        <div
          className={styles.checkbox_container}
          onClick={() => changeSelect(3)}
        >
          <input
            type="radio"
            name="planType"
            checked={selected === 3}
            onChange={() => changeSelect(3)}
          />
          <label>휴식 위주 시간표</label>
        </div>
        <button className={styles.auto_plan_button} onClick={onSubmitHandler}>
          <FontAwesomeIcon
            icon={faCalendar}
            className={styles.auto_plan_icon}
          ></FontAwesomeIcon>
          Auto Plan
        </button>
      </div>
    </div>
  );
};

export default TwoRight;
