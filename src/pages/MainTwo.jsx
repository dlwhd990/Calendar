import React from "react";
import TwoLeft from "../components/TwoLeft";
import TwoBottom from "../components/TwoBottom";
import TwoRight from "../components/TwoRight";
import styles from "../styles/MainTwo.module.css";

const MainTwo = (props) => {
  return (
    <main className={styles.mainpage}>
      <div className={styles.left}>
        <TwoLeft />
        <TwoBottom />
      </div>
      <div className={styles.right}>
        <TwoRight />
      </div>
    </main>
  );
};

export default MainTwo;
