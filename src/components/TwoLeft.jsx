import React, { useEffect, useState } from "react";
import styles from "../styles/TwoLeft.module.css";
import DayCalendar from "./DayCalendar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight,
} from "@fortawesome/free-solid-svg-icons";

const TwoLeft = ({
  selectedDate,
  dayPlanList,
  loadDayPlanList,
  selectedTypeList,
  settingSelectedDate,
}) => {
  const [thisWeek, setThisWeek] = useState([]);

  const changeSelectedDate = (direction) => {
    const today = `${selectedDate.year}-${(selectedDate.month + 1)
      .toString()
      .padStart(2, "0")}-${selectedDate.date.toString().padStart(2, "0")}`;

    const todayDate = new Date(today);

    let tomorrow;
    if (direction === "prev")
      tomorrow = new Date(todayDate.getTime() - 24 * 60 * 60 * 1000);
    else if (direction === "next")
      tomorrow = new Date(todayDate.getTime() + 24 * 60 * 60 * 1000);

    settingSelectedDate({
      year: tomorrow.getFullYear(),
      month: tomorrow.getMonth(),
      date: tomorrow.getDate(),
    });
  };

  useEffect(() => {
    const tmp = [];
    const now = `${selectedDate.year}-${(selectedDate.month + 1)
      .toString()
      .padStart(2, "0")}-${selectedDate.date.toString().padStart(2, "0")}`;
    let day = new Date(now);

    for (let i = 0; i < 7; i++) {
      const now = new Date(day.getTime() + i * 24 * 60 * 60 * 1000);
      tmp.push({
        year: now.getFullYear(),
        month: now.getMonth(),
        date: now.getDate(),
      });
    }

    setThisWeek(tmp);
  }, [selectedDate]);

  return (
    <section className={styles.left}>
      <button
        className={styles.arrow_button_left}
        onClick={() => changeSelectedDate("prev")}
      >
        <FontAwesomeIcon icon={faChevronLeft} className={styles.button_icon} />
      </button>
      <button
        className={styles.arrow_button_right}
        onClick={() => changeSelectedDate("next")}
      >
        <FontAwesomeIcon icon={faChevronRight} className={styles.button_icon} />
      </button>
      <h1>{`${selectedDate.year}년 ${selectedDate.month + 1}월`}</h1>
      <div className={styles.calendar}>
        {thisWeek.map((date, idx) => (
          <div key={date.date} className={styles.date_container}>
            <p>{`${date.month + 1}/${date.date}`}</p>
            <DayCalendar
              showIndication={idx === 0 ? true : false}
              dayPlanList={dayPlanList}
              selectedDate={date}
              loadDayPlanList={loadDayPlanList}
              selectedTypeList={selectedTypeList}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TwoLeft;
