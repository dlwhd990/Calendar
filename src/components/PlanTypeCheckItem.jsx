import React, { useEffect, useState } from "react";
import styles from "../styles/PlanTypeCheckItem.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

const PlanTypeCheckItem = ({
  item,
  selectedTypeList,
  changeSelectedTypeList,
}) => {
  const [checked, setChecked] = useState(() => {
    const flag =
      selectedTypeList.filter((el) => el.planType === item.planType).length > 0
        ? true
        : false;

    if (flag) return true;
    return false;
  });

  const changeChecked = () => {
    changeSelectedTypeList(item);
  };

  useEffect(() => {
    setChecked(() => {
      const flag =
        selectedTypeList.filter((el) => el.planType === item.planType).length >
        0
          ? true
          : false;

      if (flag) return true;
      return false;
    });
  }, [selectedTypeList]);

  return (
    <div className={styles.item} onClick={changeChecked}>
      <div
        className={`${
          checked
            ? `${styles.checkbox} ${styles.checked}`
            : `${styles.checkbox}`
        }`}
        style={checked ? { background: item.color } : {}}
      >
        <FontAwesomeIcon icon={faCheck} className={styles.checked_icon} />
      </div>
      <span>{item.planType}</span>
    </div>
  );
};

export default PlanTypeCheckItem;
