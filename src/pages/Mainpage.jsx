import ContentContainer from "../components/ContentContainer";
import styles from "../styles/Mainpage.module.css";

// 일정 더미데이터
// [    {
//   planId: 2,
//   planName: "프론트엔드 백엔드 공부",
//   planType: "자기계발",
//   start: "2023-12-01",
//   end: "2024-01-22",
// },
// {
//   planId: 3,
//   planName: "면접",
//   planType: "중요일정",
//   start: "2023-12-05",
//   end: "2023-12-05",
// },
// {
//   planId: 1,
//   planName: "밥먹기",
//   planType: "여가시간",
//   start: "2023-12-06",
//   end: "2023-12-18",
// },
// {
//   planId: 0,
//   planName: "게임하기",
//   planType: "중요일정",
//   start: "2023-12-09",
//   end: "2023-12-13",
// },]

// 일정타입 더미
// [
//   {
//     color: "#DC8686",
//     planType: "여가시간",
//   },
//   {
//     color: "#9ADE7B",
//     planType: "자기계발",
//   },
//   {
//     color: "#6DB9EF",
//     planType: "중요일정",
//   },
// ]

const Mainpage = ({
  selectedDate,
  settingSelectedDate,
  showDate,
  setShowDate,
  addPlanPopupOn,
  settingAddPlanPopupOn,
  showPlanList,
  dayPlanList,
  planTypeList,
  selectedTypeList,
  changeSelectedTypeList,
  loadPlanList,
  loadDayPlanList,
}) => {
  return (
    <main className={styles.mainpage}>
      <ContentContainer
        selectedDate={selectedDate}
        settingSelectedDate={settingSelectedDate}
        showDate={showDate}
        setShowDate={setShowDate}
        addPlanPopupOn={addPlanPopupOn}
        settingAddPlanPopupOn={settingAddPlanPopupOn}
        planList={showPlanList}
        dayPlanList={dayPlanList}
        planTypeList={planTypeList}
        selectedTypeList={selectedTypeList}
        changeSelectedTypeList={changeSelectedTypeList}
        loadPlanList={loadPlanList}
        loadDayPlanList={loadDayPlanList}
      />
    </main>
  );
};

export default Mainpage;
