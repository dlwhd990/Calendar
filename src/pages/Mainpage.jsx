import { useEffect, useState } from "react";
import ContentContainer from "../components/ContentContainer";
import styles from "../styles/Mainpage.module.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
}) => {
  const navigate = useNavigate();

  // 더미데이터로 테스트 작업
  const [planList, setPlanList] = useState([]);
  const [showPlanList, setShowPlanList] = useState([]);
  const [planTypeList, setPlanTypeList] = useState([]);
  const [selectedTypeList, setSelectedTypeList] = useState([]);

  const loadPlanTypeList = () => {
    axios
      .get("http://43.201.21.237:8080/user-plan/get")
      .then((res) => setPlanTypeList(res.data))
      .catch((err) => console.error(err));
  };

  const loadPlanList = () => {
    axios
      .get("http://43.201.21.237:8080/plan/month/get") // 아직 api 없어서 이후 수정 필요
      .then((res) => {
        const data = res.data;
        console.log(data);
        data.sort(
          (a, b) => new Date(a.end).getTime() - new Date(b.end).getTime()
        );
        console.log(data);
        setPlanList(data);
      })
      .catch((err) => console.error(err));
  };

  // 일정 그릴 때, 순서 정하기 용 함수
  const makeOrder = () => {
    const nowYear = showDate.year.toString();
    const nowMonth = (showDate.month + 1).toString().padStart(2, "0");

    const nowPlanList = planList.filter(
      (plan) =>
        plan.start.slice(5, 7) === nowMonth || plan.end.slice(5, 7) === nowMonth
    );

    nowPlanList.forEach((plan) => (plan.cnt = 0));

    for (let i = 1; i < 32; i++) {
      let cnt = 0;
      const nowDate = i.toString().padStart(2, "0");
      const today = `${nowYear}-${nowMonth}-${nowDate}`;
      const todayTime = new Date(today).getTime();

      for (let j = 0; j < nowPlanList.length; j++) {
        const plan = nowPlanList[j];
        const start = new Date(plan.start).getTime();
        const end = new Date(plan.end).getTime();
        if (todayTime >= start && todayTime <= end) {
          nowPlanList[j].cnt = Math.max(nowPlanList[j].cnt, cnt);
          cnt++;
        }
      }
    }
    console.log(nowPlanList);
    setShowPlanList(nowPlanList);
  };

  const changeSelectedTypeList = (target) => {
    const flag =
      selectedTypeList.filter((item) => item.planType === target.planType)
        .length > 0
        ? true
        : false;

    if (flag) {
      const tmp = selectedTypeList.filter(
        (item) => item.planType !== target.planType
      );
      setSelectedTypeList(tmp);
    } else {
      setSelectedTypeList((selectedTypeList) => [...selectedTypeList, target]);
    }
  };

  useEffect(() => {
    const access = localStorage.getItem("token");

    // 테스트를 위해 꺼둠 (https 문제로 vercel에서 로그인 불가능하기 때문에)
    // if (!access) {
    //   alert("로그인 후에 이용해주세요");
    //   navigate("/");
    //   return;
    // }

    axios.defaults.headers.common["Authorization"] = `Bearer ${access}`;

    loadPlanList();
    loadPlanTypeList();
  }, []);

  useEffect(() => {
    setSelectedTypeList(planTypeList);
  }, [planTypeList]);

  useEffect(() => {
    if (planList.length === 0) return;
    makeOrder();
  }, [planList, showDate]);

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
        planTypeList={planTypeList}
        selectedTypeList={selectedTypeList}
        changeSelectedTypeList={changeSelectedTypeList}
      />
    </main>
  );
};

export default Mainpage;
