import {
  faAngleLeft,
  faAngleRight,
  faCalendar,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styles from "../styles/BigCalendar.module.css";
import AddPlanPopup from "./AddPlanPopup";
import axios from "axios";

const dayCountList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const BigCalendar = ({
  selectedDate,
  settingSelectedDate,
  showDate,
  setShowDate,
  addPlanPopupOn,
  settingAddPlanPopupOn,
  planList,
  planTypeList,
  selectedTypeList,
  loadPlanList,
}) => {
  const [dayList, setDayList] = useState([]);
  const [nextDayList, setNextDayList] = useState([]);

  const makeDayList = (year, month) => {
    const targetDate = new Date(year, month, 1);
    const result = [];

    for (let i = 0; i < targetDate.getDay(); i++) {
      result.push({ year: -i, month: -i, date: -i });
    }

    for (let i = 0; i < dayCountList[month]; i++) {
      result.push({ year, month, date: i + 1 });
    }

    if (
      month === 1 &&
      ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0)
    ) {
      result.push({ year, month, date: 29 });
    }

    return result;
  };

  const changeShowDate = (direction) => {
    //direction: true면 이전, false면 다음
    if (direction) {
      if (showDate.month === 0) {
        setShowDate((state) => {
          return { year: state.year - 1, month: 11 };
        });
      } else {
        setShowDate((state) => {
          return { year: state.year, month: state.month - 1 };
        });
      }
    }

    if (!direction) {
      if (showDate.month === 11) {
        setShowDate((state) => {
          return { year: state.year + 1, month: 0 };
        });
      } else {
        setShowDate((state) => {
          return { year: state.year, month: state.month + 1 };
        });
      }
    }
  };

  const selectDateHandler = (date) => {
    if (date.year < 1 || date.month < 0 || date.date < 1) return;
    settingSelectedDate(date);
  };

  const makeDateClassName = (thisDate) => {
    const tYear = thisDate.year;
    const tMonth = thisDate.month;
    const tDate = thisDate.date;

    if (
      tYear === selectedDate.year &&
      tMonth === selectedDate.month &&
      tDate === selectedDate.date
    ) {
      return `${styles.selected}`;
    }

    return `${styles.not_selected}`;
  };

  const deletePlan = (planId) => {
    const conf = window.confirm("이 일정을 삭제하시겠습니까?");

    if (conf) {
      axios
        .post("http://13.125.51.122:8080/plan/month/delete", { planId })
        .then((res) => {
          alert("일정이 삭제되었습니다!");
          loadPlanList();
        })
        .catch((err) => {
          console.error(err);
          localStorage.removeItem("token");
          alert("에러가 발생했습니다. 다시 시도해주세요");
        });
    }
  };

  const makeCalendar = (partList) => {
    return (
      <tr className={styles.date_row}>
        {partList.map((date) => {
          return (
            <td
              className={makeDateClassName(date)}
              key={date.month.toString() + date.date?.toString()}
              onClick={() => selectDateHandler(date)}
            >
              <div className={styles.date_box}>
                {date.year <= 0 ? " " : date.date}
                {planList.map((plan) => {
                  const selected =
                    selectedTypeList.filter(
                      (el) => el.planType === plan.planType
                    ).length > 0
                      ? true
                      : false;

                  if (!selected) return "";
                  const now = new Date(
                    `${date.year}-${(date.month + 1)
                      .toString()
                      .padStart(2, "0")}-${date.date
                      .toString()
                      .padStart(2, "0")}`
                  ).getTime();
                  const start = new Date(plan.start).getTime();
                  const end = new Date(plan.end).getTime();
                  if (now >= start && end >= now) {
                    return (
                      <div
                        key={plan.planId}
                        className={`${styles.plan} ${
                          now === start ? `${styles.start}` : ""
                        } ${now === end ? `${styles.end}` : ""}`}
                        style={{
                          background: `${
                            planTypeList.filter(
                              (el) => el.planType === plan.planType
                            )[0].color
                          }`,
                          top: `${plan.cnt * 2.3}rem`,
                        }}
                        onClick={() => deletePlan(plan.planId)}
                      >
                        {now === start && <span>{plan.planName}</span>}
                      </div>
                    );
                  }
                  // return <div key={plan.planId}></div>;
                })}
              </div>
            </td>
          );
        })}
      </tr>
    );
  };

  useEffect(() => {
    setDayList(makeDayList(showDate.year, showDate.month));
    if (showDate.month === 11) {
      setNextDayList(makeDayList(showDate.year + 1, 0));
    } else {
      setNextDayList(makeDayList(showDate.year, showDate.month + 1));
    }
  }, [showDate]);

  useEffect(() => {
    const now = new Date();
    makeDateClassName({
      year: now.getFullYear(),
      month: now.getMonth() + 1,
      date: now.getDate(),
    });
  }, []);

  // 일정 종류 선택 팝업
  // 일정 시작, 종료 일자 선택 캘린더 팝업
  return (
    <div className={styles.calendar}>
      <div className={styles.add_plan_container}>
        <div className={styles.add_plan_button} onClick={settingAddPlanPopupOn}>
          <span>일정 추가</span>
          <FontAwesomeIcon icon={faCalendar} className={styles.add_plan_icon} />
          <FontAwesomeIcon icon={faPlus} className={styles.add_plan_icon} />
        </div>
        {addPlanPopupOn && (
          <AddPlanPopup
            selectedDate={selectedDate}
            planTypeList={planTypeList}
            closePopup={settingAddPlanPopupOn}
            loadPlanList={loadPlanList}
          />
        )}
      </div>
      <div className={styles.container}>
        <h2>{`${showDate.year}년 ${showDate.month + 1}월`}</h2>
        <table className={styles.table}>
          <tbody>
            <tr className={styles.yoil}>
              <td>일</td>
              <td>월</td>
              <td>화</td>
              <td>수</td>
              <td>목</td>
              <td>금</td>
              <td>토</td>
            </tr>
            {makeCalendar(dayList.slice(0, 7))}
            {makeCalendar(dayList.slice(7, 14))}
            {makeCalendar(dayList.slice(14, 21))}
            {makeCalendar(dayList.slice(21, 28))}
            {makeCalendar(dayList.slice(28, 35))}
            {makeCalendar(dayList.slice(35, 42))}
          </tbody>
        </table>
        <button className={styles.left_button}>
          <FontAwesomeIcon
            icon={faAngleLeft}
            className={styles.left}
            onClick={() => changeShowDate(true)}
          />
        </button>
        <button className={styles.right_button}>
          <FontAwesomeIcon
            icon={faAngleRight}
            className={styles.right}
            onClick={() => changeShowDate(false)}
          />
        </button>
      </div>
    </div>
  );
};

export default BigCalendar;
