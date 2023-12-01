import { faAngleLeft, faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import styles from "../styles/AddPlanCalendar.module.css";

const date = new Date();
const dayCountList = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

const Calendar = ({ selectedDate, settingSelectedDate, closePopup }) => {
  const [showDate, setShowDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });

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

  return (
    <div className={styles.calendar}>
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
      <button className={styles.done_button} onClick={closePopup}>
        Done
      </button>
    </div>
  );
};

export default Calendar;
