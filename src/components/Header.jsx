import { faCalendar, faClock } from "@fortawesome/free-regular-svg-icons";
import styles from "../styles/Header.module.css";
import TabButton from "./TabButton";

const Header = ({ tab, onTabClick }) => {
  return (
    <header className={styles.header}>
      <img
        src="https://blog.kakaocdn.net/dn/CNxUY/btqw7dnElRU/HuVZgvpT6J8n4aEYFathEk/img.jpg"
        alt="logo"
        className={styles.logo}
      />
      <div className={styles.button_container}>
        <TabButton
          icon={faCalendar}
          callback={() => onTabClick("one")}
          selected={tab}
          tabName={"one"}
        />
        <TabButton
          icon={faClock}
          callback={() => onTabClick("two")}
          selected={tab}
          tabName={"two"}
        />
      </div>
    </header>
  );
};

export default Header;
