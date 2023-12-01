import styles from "../styles/OneRight.module.css";

const OneRight = ({ selectedDate }) => {
  return (
    <aside className={styles.right}>
      <div className={styles.top}>
        <p className={styles.top_date}>{`${selectedDate.year}.${(
          selectedDate.month + 1
        )
          .toString()
          .padStart(2, "0")}.${selectedDate.date
          .toString()
          .padStart(2, "0")}`}</p>
        <p className={styles.top_title}>Time Table</p>
      </div>
    </aside>
  );
};

export default OneRight;
