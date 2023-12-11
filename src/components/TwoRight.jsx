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

// 1. 달성률 api 문자열 숫자 -->json으로따로
// 2. 총공부시간api -GET - /get/totalStudyTime
// 3. 일일일정 저장 api ->자동플랜추천 데이터 받으면 그날 유동일정 모두삭제하고 추천플랜저장 or 사용자가 하나씩 수동으로 일일히 등록하는 경우에는 삭제안하고 바로 그대로 저장

const TwoRight = ({
  loadDayPlanList,
  selectedDate,
  planTypeList,
  totalTime,
  successRate,
  successMsg,
}) => {
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
      <div className={styles.success_container}>
        <div className={styles.success_box_one}>
          <p className={styles.success_title}>총 공부 시간</p>
          <p className={styles.success_data}>
            <span>{totalTime[0]}</span>시간 <span>{totalTime[1]}</span>분
          </p>
        </div>
        <div className={styles.success_box_two}>
          <p className={styles.success_title}>달성률</p>
          <p className={styles.success_data}>
            <span>{successRate}</span>%
          </p>
        </div>
        <p className={styles.success_message}>{successMsg}</p>
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
