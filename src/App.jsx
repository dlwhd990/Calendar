import { useState } from "react";
import "./App.css";
import Mainpage from "./pages/Mainpage";

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
      <Mainpage
        tab={tab}
        onTabClick={onTabClick}
        selectedDate={selectedDate}
        settingSelectedDate={settingSelectedDate}
        showDate={showDate}
        setShowDate={settingShowDate}
      />
    </div>
  );
}

export default App;
