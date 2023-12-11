import React, { useEffect, useState } from "react";
import styles from "../styles/DayCalendar.module.css";
import { hourList, minuteList, yoilList } from "../util/time";
import axios from "axios";
import DayInfoPopup from "./DayInfoPopup";

// 일일 일정 그리기
// 1. 리스트를 받아온다.
// 2. selectedDate에 맞는 일정만을 모은다. (selectedDate useEffect)
// 3. 그 일정 내에서 시간 별로 정렬한다. (월별과 동일한 기준)
// 4. 그린다 (월별과 동일, 차이점은 [월별] => 1일마다 돌리기 / [일일] => 10분 마다 돌리기)

// 시작 => 그 다음 칸 부터 그리면 된다 (00분 시작 = 첫 칸 부터 / 50분 시작 = 6번 칸 부터 (칸은 1~6번))
// 끝 => 00분 끝 => 6번칸까지 색칠 / 10분 끝 => 1번 칸 색칠 (딱 자기 칸 까지만)

// [00 ~ 23], [00 ~ 50] => 두가지로 돌면서 그리기, 일정도 그 안에서 돌면서 비교
// ex) 06:40 ~ 07:20 일정이라면 => hour 체크, start가 6이니까 통과, 그 뒤에 minute 체크하는데 40부터니 5번 칸 부터 색칠
// end 보다 작을 때 까지만 색칠 (00분 끝인 경우에만 특수 처리)

const DayCalendar = ({
  showIndication,
  dayPlanList,
  selectedDate,
  loadDayPlanList,
  selectedTypeList,
  changeSuccessRate,
  changeSuccessMsg,
}) => {
  const [showDayPlanList, setShowDayPlanList] = useState([]);
  const [showInfo, setShowInfo] = useState(false);

  const changeShowInfo = (target) => {
    setShowInfo(target);
  };

  const deleteDayPlan = (e, planId) => {
    e.stopPropagation();
    const conf = window.confirm("일정을 삭제하시겠습니까?");

    if (!conf) return;

    axios
      .post("http://13.125.51.122:8080/plan/day/delete", { planId })
      .then((res) => {
        console.log(res.data);
        alert("삭제되었습니다.");
        loadDayPlanList();
      })
      .catch((err) => {
        console.error(err);
        alert("문제가 발생했습니다. 다시 시도해주세요");
        localStorage.removeItem("token");
      });
  };

  // 일정 그릴 때, 순서 정하기 용 함수
  const makeDayOrder = () => {
    const nowYear = selectedDate.year.toString();
    const nowMonth = (selectedDate.month + 1).toString().padStart(2, "0");
    const nowDate = selectedDate.date.toString().padStart(2, "0");

    const now = `${nowYear}-${nowMonth}-${nowDate}`;

    const nowPlanList = dayPlanList.filter(
      (plan) =>
        plan.start.slice(0, 10) === now &&
        selectedTypeList.filter((t) => t.planType === plan.planType).length > 0
    );

    dayPlanList.forEach((plan) => {
      const yoil = yoilList[new Date(now).getDay()];
      if (
        plan.plan === "고정" &&
        plan.dayOfWeek &&
        plan.dayOfWeek.includes(yoil) &&
        !nowPlanList.includes(plan) // 되나?
      ) {
        const start = `${now}T${plan.start.slice(11, 19)}`;
        const end = `${now}T${plan.end.slice(11, 19)}`;

        nowPlanList.push({ ...plan, start, end });
      }
    });

    nowPlanList.forEach((plan) => (plan.cnt = 0));

    for (let i = 0; i < hourList.length; i++) {
      for (let j = 0; j < minuteList.length; j++) {
        let cnt = 0;
        const nowTime = new Date(
          `${nowYear}-${nowMonth}-${nowDate}T${hourList[i]}:${minuteList[j]}:00`
        ).getTime();

        for (let k = 0; k < nowPlanList.length; k++) {
          const plan = nowPlanList[k];
          const start = new Date(plan.start).getTime();
          const end = new Date(plan.end).getTime();
          if (nowTime >= start && nowTime < end) {
            nowPlanList[k].cnt = Math.max(nowPlanList[k].cnt, cnt);
            cnt++;
          }
        }
      }
    }

    setShowDayPlanList(nowPlanList);
  };

  useEffect(() => {
    makeDayOrder();
  }, [selectedDate, dayPlanList]);

  useEffect(() => {
    if (dayPlanList.length === 0) return;
    makeDayOrder();
  }, [dayPlanList, selectedDate, selectedTypeList]);

  return (
    <div className={styles.calendar}>
      {showInfo && (
        <DayInfoPopup
          plan={showInfo}
          changeShowInfo={changeShowInfo}
          loadDayPlanList={loadDayPlanList}
          dayPlanList={dayPlanList}
          changeSuccessRate={changeSuccessRate}
          changeSuccessMsg={changeSuccessMsg}
        />
      )}
      <div className={styles.main}>
        {hourList.map((h) => (
          <div key={h} className={styles.hour}>
            {showIndication && (
              <div
                className={styles.indication_box}
                style={{ width: "calc(100% / 7)" }}
              >
                {h}
              </div>
            )}
            {minuteList.map((m) => (
              <div
                key={m}
                className={styles.minute}
                style={
                  showIndication ? { width: "calc((100% + 2.02px) / 7)" } : {}
                }
              >
                {selectedDate &&
                  showDayPlanList.map((plan) => {
                    const now = new Date(
                      `${selectedDate.year}-${(selectedDate.month + 1)
                        .toString()
                        .padStart(2, "0")}-${selectedDate.date
                        .toString()
                        .padStart(2, "0")}T${h}:${m}:00`
                    ).getTime();

                    const start = new Date(plan.start).getTime();
                    const end = new Date(plan.end).getTime();

                    if (now >= start && now < end)
                      return (
                        <div
                          key={plan.planId}
                          className={styles.plan}
                          style={{
                            background: plan.color,
                            top: `${plan.cnt * 1.32}rem`,
                          }}
                          onClick={() => changeShowInfo(plan)}
                        >
                          <span onClick={(e) => deleteDayPlan(e, plan.planId)}>
                            {now === start && plan.planName}
                          </span>
                        </div>
                      );
                  })}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default DayCalendar;
