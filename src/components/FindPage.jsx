import React, { useState } from "react";
import styles from "../styles/FindPage.module.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";

export default function FindPage() {
  const [phoneNum, setPhoneNum] = useState("");
  const changePhoneNum = (e) => setPhoneNum(e.target.value);
  const [phoneNum2, setPhoneNum2] = useState("");
  const changePhoneNum2 = (e) => setPhoneNum2(e.target.value);
  const [userId, setUserId] = useState("");
  const changeUserId = (e) => setUserId(e.target.value);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    axios
      .post("http://13.125.51.122:8080/user/findId", {
        phoneNum,
      })
      .then((response) => {
        console.log(response.data);
        alert(response.data);
      })
      .catch((Error) => {
        console.log(Error);
        alert("전화번호를 확인해주세요.");
      });
  };
  const onSubmitHandler2 = (e) => {
    e.preventDefault();
    axios
      .post("http://13.125.51.122:8080/user/findPw", {
        phoneNum: phoneNum2,
        userId,
      })
      .then((response) => {
        console.log(response.data);
        alert(response.data);
      })
      .catch((Error) => {
        console.log(Error);
      });
  };

  return (
    <main className={styles.body}>
      <div className={styles.container}>
        <FontAwesomeIcon icon={faLock} className={styles.locker} />
        <h1>로그인에 문제가 있나요?</h1>
        <p className={styles.p}>
          아이디, 휴대폰번호를 입력하시면 필요하신 정보를 찾아드립니다.
        </p>
        <div className={styles.find_id}>
          <h2>아이디 찾기</h2>
          <form className={styles.form} onSubmit={onSubmitHandler}>
            <input
              name="input_num"
              value={phoneNum}
              type="text"
              spellCheck="false"
              placeholder="휴대폰번호"
              onChange={changePhoneNum}
            />
            <button className={styles.button} type="submit">
              찾기
            </button>
          </form>
        </div>
        <div className={styles.find_pw}>
          <h2>비밀번호 찾기</h2>
          <form className={styles.form} onSubmit={onSubmitHandler2}>
            <input
              onChange={changePhoneNum2}
              name="input_num2"
              value={phoneNum2}
              type="text"
              spellCheck="false"
              placeholder="휴대폰번호"
            />
            <input
              onChange={changeUserId}
              name="input_Id"
              value={userId}
              type="text"
              spellCheck="false"
              placeholder="아이디"
            />
            <button className={styles.button} type="submit">
              찾기
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
