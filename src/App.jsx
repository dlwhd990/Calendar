import { useState } from "react";
import "./App.css";
import Mainpage from "./pages/Mainpage";
import Header from "./components/Header";
import MainTwo from "./pages/MainTwo";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FindPage from "./components/FindPage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";

function App() {
  const date = new Date();
  const [tab, setTab] = useState("one");
  const [addPlanPopupOn, setAddPlanPopupOn] = useState(false);

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
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/find" element={<FindPage />}></Route>
        <Route
          path="/date"
          element={
            <>
              <Header tab={tab} onTabClick={onTabClick} />
              {tab === "one" && (
                <Mainpage
                  selectedDate={selectedDate}
                  settingSelectedDate={settingSelectedDate}
                  showDate={showDate}
                  setShowDate={settingShowDate}
                  addPlanPopupOn={addPlanPopupOn}
                  settingAddPlanPopupOn={settingAddPlanPopupOn}
                />
              )}
              {tab === "two" && <MainTwo />}
            </>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
