import { useState } from "react";
import "./App.css";
import Mainpage from "./pages/Mainpage";
import MainTwo from "./pages/MainTwo";
import Header from "./components/Header";

function App() {
  const date = new Date();
  const [tab, setTab] = useState("one");
  const [addPlanPopupOn, setAddPlanPopupOn] = useState(false);
  const [planTypeList, setPlanTypeList] = useState([
    {
      color: "#DC8686",
      title: "여가시간",
    },
    {
      color: "#508D69",
      title: "자기계발",
    },
    {
      color: "#3081D0",
      title: "중요일정",
    },
  ]); // 임시로 데이터 형식 설정, 나중에 바꿔야 됨

  const [selectedDate, setSelectedDate] = useState({
    year: date.getFullYear(),
    month: date.getMonth(),
    date: date.getDate(),
  });

  const [showDate, setShowDate] = useState({
    year: new Date().getFullYear(),
    month: new Date().getMonth(),
  });

  const onTabClick = (tabName) => {
    setTab(tabName);
  };

  const settingSelectedDate = (target) => {
    setSelectedDate(target);
  };

  const settingShowDate = (target) => {
    setShowDate(target);
  };

  // 일정 추가 팝업 여부 설정
  const settingAddPlanPopupOn = () => {
    setAddPlanPopupOn((addPlanPopupOn) => !addPlanPopupOn);
  };

  return (
    <div className="App">
      <Header tab={tab} onTabClick={onTabClick} />
      {tab === "one" && (
        <Mainpage
          selectedDate={selectedDate}
          settingSelectedDate={settingSelectedDate}
          showDate={showDate}
          setShowDate={settingShowDate}
          addPlanPopupOn={addPlanPopupOn}
          settingAddPlanPopupOn={settingAddPlanPopupOn}
          planTypeList={planTypeList}
        />
      )}
      {tab === "two" && <MainTwo />}
    </div>
  );
}

export default App;
