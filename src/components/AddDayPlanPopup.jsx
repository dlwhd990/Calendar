import React, { useEffect, useState } from "react";
import styles from "../styles/AddDayPlanPopup.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import PlanTypeItem from "./PlanTypeItem";
import axios from "axios";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { hourList, minuteList } from "../util/time";

const AddDayPlanPopup = ({
  planTypeList,
  selectedDate,
  closePopup,
  loadDayPlanList,
}) => {
  const [planTypeListOn, setPlanTypeListOn] = useState(false);
  const [planName, setPlanName] = useState("");
  const [planType, setPlanType] = useState(planTypeList[0]);
  const [startTime, setStartTime] = useState({ hour: "00", minute: "00" });
  const [endTime, setEndTime] = useState({ hour: "00", minute: "00" });

  const settingPlanTypeListOn = () => {
    setPlanTypeListOn((planTypeListOn) => !planTypeListOn);
  };

  const changePlanType = (target) => {
    setPlanType(target);
    setPlanTypeListOn(false);
  };

  const changePlanName = (e) => {
    setPlanName(e.target.value);
  };

  const settingStartTime = (value, kind) => {
    if (kind === "hour") setStartTime({ ...startTime, hour: value });
    else setStartTime({ ...startTime, minute: value });
  };

  const settingEndTime = (value, kind) => {
    if (kind === "hour") setEndTime({ ...endTime, hour: value });
    else setEndTime({ ...endTime, minute: value });
  };

  const submitPlan = () => {
    // 서버로 입력 내용 전송 (startDate,endDate, planType, planName)
    // planName => 이거는 반드시 입력해야 하므로 이거 예외처리 부분 필수

    if (planName === "") {
      alert("일정 이름은 필수로 입력해야 합니다.");
      return;
    }

    const start = `${selectedDate.year}-${(selectedDate.month + 1)
      .toString()
      .padStart(2, "0")}-${selectedDate.date.toString().padStart(2, "0")}T${
      startTime.hour
    }:${startTime.minute}:00`;

    const end = `${selectedDate.year}-${(selectedDate.month + 1)
      .toString()
      .padStart(2, "0")}-${selectedDate.date.toString().padStart(2, "0")}T${
      endTime.hour
    }:${endTime.minute}:00`;

    const data = {
      planName,
      planType: planType.planType,
      start,
      end,
      color: planType.color,
      plan: "유동",
      success: 0,
    };

    axios
      .post("http://13.125.51.122:8080/plan/day/add", data)
      .then((res) => {
        console.log(res);
        loadDayPlanList();
      })
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("token");
      });
    closePopup();
  };

  useEffect(() => {
    console.log(startTime);
  }, [startTime]);

  return (
    <div className={styles.popup}>
      <p className={styles.title}>일정 이름</p>
      <div className={styles.input_container}>
        <input type="text" value={planName} onChange={changePlanName} />
        <div className={styles.select_button} onClick={settingPlanTypeListOn}>
          <div
            className={styles.colorbox}
            style={{ background: `${planType.color}` }}
          ></div>
          <FontAwesomeIcon icon={faChevronDown} className={styles.icon} />
        </div>
        {planTypeListOn && (
          <div className={styles.plan_type_list}>
            {planTypeList.map((item) => (
              <PlanTypeItem
                key={item.planType + item.color}
                item={item}
                changePlanType={() => changePlanType(item)}
              />
            ))}
          </div>
        )}
      </div>
      <div className={styles.time_select_container}>
        <div className={styles.time_box}>
          <p>시작 시간</p>
          <div className={styles.input_box}>
            <select onChange={(e) => settingStartTime(e.target.value, "hour")}>
              {hourList.map((h) => (
                <option value={h}>{h}</option>
              ))}
            </select>
            <span>시</span>
            <select
              onChange={(e) => settingStartTime(e.target.value, "minute")}
            >
              {minuteList.map((m) => (
                <option value={m}>{m}</option>
              ))}
            </select>
            <span>분</span>
          </div>
        </div>
        <div className={styles.time_box}>
          <p>종료 시간</p>
          <div className={styles.input_box}>
            <select onChange={(e) => settingEndTime(e.target.value, "hour")}>
              {hourList.map((h) => (
                <option value={h}>{h}</option>
              ))}
            </select>
            <span>시</span>
            <select onChange={(e) => settingEndTime(e.target.value, "minute")}>
              {minuteList.map((m) => (
                <option value={m}>{m}</option>
              ))}
            </select>
            <span>분</span>
          </div>
        </div>
      </div>
      <button className={styles.submit_button} onClick={submitPlan}>
        Done
      </button>
    </div>
  );
};

export default AddDayPlanPopup;
