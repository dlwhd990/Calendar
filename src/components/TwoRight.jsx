import React from "react";
import styles from "../styles/TwoRight.module.css";

// 일일 일정 그리기
// 1. 리스트를 받아온다.
// 2. selectedDate에 맞는 일정만을 모은다. (selectedDate useEffect)
// 3. 그 일정 내에서 시간 별로 정렬한다. (월별과 동일한 기준)
// 4. 그린다 (월별과 동일, 차이점은 [월별] => 1일마다 돌리기 / [일일] => 10분 마다 돌리기)

const TwoRight = (props) => {
  return <div className={styles.right}></div>;
};

export default TwoRight;
