import React, { useEffect, useState } from "react";
import styles from "../styles/TwoLeft.module.css";
import DayCalendar from "./DayCalendar";

const TwoLeft = ({
  selectedDate,
  dayPlanList,
  loadDayPlanList,
  selectedTypeList,
}) => {
  const [thisWeek, setThisWeek] = useState([]);

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

    console.log(tmp);
    setThisWeek(tmp);
  }, [selectedDate]);

  return (
    <section className={styles.left}>
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
