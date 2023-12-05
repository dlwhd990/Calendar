import { useEffect, useState } from "react";
import ContentContainer from "../components/ContentContainer";
import styles from "../styles/Mainpage.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Mainpage = ({
  selectedDate,
  settingSelectedDate,
  showDate,
  setShowDate,
  addPlanPopupOn,
  settingAddPlanPopupOn,
}) => {
  const navigate = useNavigate();

  // 더미데이터로 테스트 작업
  const [planList, setPlanList] = useState([
    {
      planId: 2,
      planName: "프론트엔드 백엔드 공부",
      planType: "자기계발",
      start: "2023-12-01",
      end: "2024-01-22",
    },
    {
      planId: 3,
      planName: "면접",
      planType: "중요일정",
      start: "2023-12-05",
      end: "2023-12-05",
    },
    {
      planId: 1,
      planName: "밥먹기",
      planType: "여가시간",
      start: "2023-12-06",
      end: "2023-12-18",
    },
    {
      planId: 0,
      planName: "게임하기",
      planType: "중요일정",
      start: "2023-12-09",
      end: "2023-12-13",
    },
  ]);

  const [planTypeList, setPlanTypeList] = useState([
    {
      color: "#DC8686",
      planType: "여가시간",
    },
    {
      color: "#508D69",
      planType: "자기계발",
    },
    {
      color: "#3081D0",
      planType: "중요일정",
    },
  ]); // 임시로 데이터 형식 설정, 나중에 바꿔야 됨

  const loadPlanTypeList = () => {
    axios
      .get("http://43.201.21.237:8080/plan/day/type")
      .then((res) => setPlanTypeList(res.data))
      .catch((err) => console.error(err));
  };

  const loadPlanList = () => {
    axios
      .get("http://43.201.21.237:8080/plan/day/type") // 아직 api 없어서 이후 수정 필요
      .then((res) => {
        const sorted = res.data.sort((a, b) => a.start < b.start);
        setPlanList(sorted);
      })
      .catch((err) => console.error(err));
  };

  useEffect(() => {
    const access = localStorage.getItem("token");

    if (!access) {
      alert("로그인 후에 이용해주세요");
      navigate("/");
      return;
    }

    axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;

    // loadPlanList();
    // loadPlanTypeList();
  }, []);
  return (
    <main className={styles.mainpage}>
      <ContentContainer
        selectedDate={selectedDate}
        settingSelectedDate={settingSelectedDate}
        showDate={showDate}
        setShowDate={setShowDate}
        addPlanPopupOn={addPlanPopupOn}
        settingAddPlanPopupOn={settingAddPlanPopupOn}
        planList={planList}
        planTypeList={planTypeList}
      />
    </main>
  );
};

export default Mainpage;
