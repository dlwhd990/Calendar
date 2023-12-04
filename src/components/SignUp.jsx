import React, { useState } from "react";
import axios from "axios";
import styles from "../styles/SignUp.module.css";

export default function SignUp() {
  const [userId, setUserId] = useState("");
  const [status, setStatus] = useState(false);
  const [userPw, setUserPw] = useState("");
  const [userName, setUserName] = useState("");
  const [birth, setBirth] = useState();
  const [sex, setSex] = useState("M");
  const [student, setStudent] = useState("middle/high");
  const [phoneNum, setPhoneNum] = useState("");

  const changeUserId = (e) => setUserId(e.target.value);
  const changeUserPw = (e) => setUserPw(e.target.value);
  const changeUserName = (e) => setUserName(e.target.value);
  const changeBirth = (e) => setBirth(e.target.value);
  const changeSex = (e) => setSex(e.target.value);
  const changeStudent = (e) => setStudent(e.target.value);
  const changePhoneNum = (e) => setPhoneNum(e.target.value);

  const checkUserId = () => {
    if (userId === null) return;
    axios
      .post("http://13.209.49.242:8080/user/checkId", { userId })
      .then((res) => {
        console.log(res.data);
        console.log("사용가능한 아이디입니다.");
        alert("사용가능한 아이디입니다.");
        setStatus(true);
      })
      .catch((err) => console.log(err.res));
    alert("중복된 아이디입니다.");
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (
      !userId ||
      !userPw ||
      !userName ||
      !birth ||
      !sex ||
      !student ||
      !phoneNum ||
      !status
    ) {
      alert("모든 정보를 기입해주세요.");
      return;
    }
    axios
      .post("http://13.209.49.242:8080/user/register", {
        userId,
        userPw,
        userName,
        birth,
        sex,
        student,
        phoneNum,
      })
      .then((response) => {
        console.log(response.data);
        alert("회원가입에 성공했습니다!");
      })
      .catch((Error) => {
        console.log(Error.response.data);
      });
  };

  return (
    <main className={styles.body}>
      <div className={styles.container}>
        <h1 className={styles.title}>Auto-Scheduler</h1>
        <form className={styles.form} onSubmit={onSubmitHandler}>
          <div className={styles.input_with_button}>
            <input
              name="id"
              value={userId}
              onChange={changeUserId}
              type="text"
              spellCheck="false"
              placeholder="아이디"
            />
            <button type="button" onClick={checkUserId}>
              검사
            </button>
          </div>
          <div className={styles.input_without_button}>
            <input
              name="pw"
              value={userPw}
              onChange={changeUserPw}
              type="password"
              spellCheck="false"
              placeholder="비밀번호"
            />
          </div>
          <div className={styles.input_without_button}>
            <input
              name="name"
              value={userName}
              onChange={changeUserName}
              type="text"
              spellCheck="false"
              placeholder="사용자 이름"
            />
          </div>
          <div className={styles.input_without_button}>
            <input
              name="birth"
              value={birth}
              onChange={changeBirth}
              type="text"
              spellCheck="false"
              placeholder="생년월일 8자리"
            />
          </div>
          <div className={styles.input_without_button}>
            <input
              name="phone"
              value={phoneNum}
              onChange={changePhoneNum}
              type="text"
              spellCheck="false"
              placeholder="휴대폰 번호"
            />
          </div>
          <label for="userSex">성별</label>
          <div className={styles.radio_con1}>
            <div className={styles.form_radio_btn}>
              <input
                type="radio"
                value="M"
                id="radio-1"
                onChange={changeSex}
                name="userSex"
                checked
              />
              <label for="radio-1">남자</label>
            </div>
            <div className={styles.form_radio_btn}>
              <input
                type="radio"
                value="F"
                id="radio-2"
                onChange={changeSex}
                name="userSex"
              />
              <label for="radio-2">여자</label>
            </div>
          </div>
          <label for="userGrade">직업군</label>
          <div className={styles.radio_con1}>
            <div className={styles.form_radio_btn}>
              <input
                type="radio"
                value="middle/high"
                id="radio-3"
                onChange={changeStudent}
                name="userGrade"
                checked
              />
              <label for="radio-3">중/고등학생</label>
            </div>
            <div className={styles.form_radio_btn}>
              <input
                type="radio"
                value="colleage"
                id="radio-4"
                onChange={changeStudent}
                name="userGrade"
              />
              <label for="radio-4">대학생</label>
            </div>
          </div>
          <button className={styles.submit_button} type="submit">
            가입
          </button>
        </form>
      </div>
    </main>
  );
}
