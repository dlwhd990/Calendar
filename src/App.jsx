import { useState } from "react";
import "./App.css";
import Mainpage from "./pages/Mainpage";
import MainTwo from "./pages/MainTwo";
import Header from "./components/Header";

function App() {
  const date = new Date();
  const [tab, setTab] = useState("one");

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

  return (
    <div className="App">
      <Header tab={tab} onTabClick={onTabClick} />
      {tab === "one" && (
        <Mainpage
          selectedDate={selectedDate}
          settingSelectedDate={settingSelectedDate}
          showDate={showDate}
          setShowDate={settingShowDate}
        />
      )}
      {tab === "two" && <MainTwo />}
    </div>
  );
}

export default App;
