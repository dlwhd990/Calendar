import React from "react";
import styles from "../styles/DayInfoPopup.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

const DayInfoPopup = ({
  plan,
  changeShowInfo,
  loadDayPlanList,
  changeSuccessRate,
  changeSuccessMsg,
}) => {
  const onButtonClickHandler = () => {
    const { cnt, ...original } = plan;

    axios
      .patch("http://13.125.51.122:8080/plan/success/day", {
        ...original,
        success: original.success === 0 ? 1 : 0,
      })
      .then((res) => {
        console.log(res);
        changeSuccessRate(res.data.result.slice(0, res.data.result.length - 1));
        changeSuccessMsg(res.data.message);
        changeShowInfo({
          ...original,
          success: original.success === 1 ? 0 : 1,
        });
        loadDayPlanList();
      })
      .catch((err) => {
        console.error(err);
        alert("에러가 발생했습니다. 다시 시도해주세요.");
      });
  };

  return (
    <div className={styles.filter}>
      <div className={styles.popup}>
        <button
          className={styles.close_button}
          onClick={() => changeShowInfo(false)}
        >
          <FontAwesomeIcon icon={faXmark} className={styles.close_icon} />
        </button>
        <div className={styles.plan_type_container}>
          <div
            className={styles.colorbox}
            style={{ background: plan.color }}
          ></div>
          <span>{plan.planType}</span>
        </div>
        <p className={styles.plan_name}>{plan.planName}</p>
        <div className={styles.date_box}>
          <p className={styles.date_title}>시작</p>
          <p className={styles.date_string}>{`${plan.start.slice(
            0,
            4
          )}년 ${plan.start.slice(5, 7)}월 ${plan.start.slice(
            8,
            10
          )}일 ${plan.start.slice(11, 13)}시 ${plan.start.slice(14, 16)}분`}</p>
        </div>
        <div className={styles.date_box}>
          <p className={styles.date_title}>종료</p>
          <p className={styles.date_string}>{`${plan.end.slice(
            0,
            4
          )}년 ${plan.end.slice(5, 7)}월 ${plan.end.slice(
            8,
            10
          )}일 ${plan.end.slice(11, 13)}시 ${plan.end.slice(14, 16)}분`}</p>
        </div>
        <button
          className={styles.success_button}
          style={
            plan.success === 1
              ? { background: plan.color }
              : { background: "#EFEFEF" }
          }
          onClick={onButtonClickHandler}
        >
          <FontAwesomeIcon
            icon={faCheck}
            className={styles.check_icon}
            style={plan.success === 1 ? { color: "white" } : { color: "black" }}
          />
          <span
            style={plan.success === 1 ? { color: "white" } : { color: "black" }}
          >
            달성
          </span>
        </button>
      </div>
    </div>
  );
};

export default DayInfoPopup;
