import React, { useState } from "react";
import styles from "../styles/AddPlanType.module.css";
import axios from "axios";

// 1. 등록할 일정 타입 이름과 색상을 고른다.
// 2. 서버에 전송한다.
// 3. 다시 전체 목록을 불러와서 View 업데이트한다.

const colorList = [
  "#DC8686",
  "#FF90BC",
  "#3081D0",
  "#67729D",
  "#9ADE7B",
  "#FF6C22",
  "#6DB9EF",
  "#994D1C",
];

const AddPlanType = ({ changePopup }) => {
  const [planType, setPlanType] = useState("");
  const [selectedColor, setSelectedColor] = useState("#DC8686");

  const changeColor = (target) => {
    setSelectedColor(target);
  };

  const changePlanType = (e) => {
    setPlanType(e.target.value);
  };

  const submitPlanType = () => {
    // 서버 통신 부분
    // planTypeList 갱신하는 부분
    const data = {
      planType,
      color: selectedColor,
    };

    axios
      .post("http://13.125.51.122:8080/user-plan/add", data)
      .then((res) => console.log(res))
      .catch((err) => {
        console.error(err);
        localStorage.removeItem("token");
      });
    changePopup();
  };

  return (
    <div className={styles.popup}>
      <div className={styles.input_container}>
        <p>타입 이름</p>
        <input value={planType} onChange={changePlanType} type="text" />
      </div>
      <div className={styles.color_select_container}>
        <p>색상 선택</p>
        <div className={styles.color_box}>
          {colorList.slice(0, 4).map((color) => (
            <div
              key={color}
              className={`${
                selectedColor === color ? `${styles.selected}` : ""
              }`}
              style={{ background: `${color}` }}
              onClick={() => changeColor(color)}
            ></div>
          ))}
        </div>
        <div className={styles.color_box}>
          {colorList.slice(4, 8).map((color) => (
            <div
              key={color}
              className={`${
                selectedColor === color ? `${styles.selected}` : ""
              }`}
              style={{ background: `${color}` }}
              onClick={() => changeColor(color)}
            ></div>
          ))}
        </div>
      </div>
      <button onClick={submitPlanType}>등록</button>
    </div>
  );
};

export default AddPlanType;
