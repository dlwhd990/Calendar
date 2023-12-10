import styles from "../styles/Login.module.css";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faLock, faUser } from '@fortawesome/free-solid-svg-icons';
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [userId, setUserId] = useState("");
  const [userPw, setPw] = useState("");

  const moveToMainPage = () => {
    navigate("/date");
  };

  const moveToSignUpPage = () => {
    navigate("/signup");
  };
  const moveToFindPage = () => {
    navigate("/find");
  };

  const changeUserId = (e) => {
    setUserId(e.target.value);
  };

  const changePw = (e) => {
    setPw(e.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const data = {
      userId,
      userPw,
    };

    axios
      .post("http://13.125.51.122:8080/user/login", data)
      .then((res) => {
        console.log(res);
        const { token } = res.data;
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        localStorage.setItem("token", token);
        localStorage.setItem("userId", userId);
        alert("환영합니다!");
        moveToMainPage();
      })
      .catch((err) => {
        console.error(err);
        alert("입력 정보를 다시 확인해주세요.");
        return;
      });
  };
  // 팝업
  // const [popUpOn, setPopUpOn] = useState(false);
  // const changeValue = () => {
  //   setPopUpOn(() => !popUpOn);
  // };
  return (
    <main className={styles.body}>
      <div className={styles.container}>
        {/* {popUpOn && <FindPop changeValue={changeValue} />} */}
        <h1 className={styles.title}>Auto-Scheduler</h1>
        <form className={styles.form} onSubmit={onSubmitHandler}>
          <div>
            <div>
              {/* <FontAwesomeIcon icon={faUser} className={styles.icon} /> */}
              <input
                onChange={changeUserId}
                spellCheck="false"
                placeholder="아이디"
                type="text"
              />
            </div>
            <div>
              {/* <FontAwesomeIcon icon={faLock} className={styles.icon} /> */}
              <input
                onChange={changePw}
                spellCheck="false"
                placeholder="비밀번호"
                type="password"
              />
            </div>
          </div>
          <button className={styles.login_button} type="submit">
            로그인
          </button>
        </form>
        <button className={styles.lost_pw} onClick={moveToFindPage}>
          로그인에 문제가 있나요?
        </button>
      </div>
      <div className={styles.container2}>
        <p>계정이 없으신가요?</p>
        <button className={styles.signup} onClick={moveToSignUpPage}>
          가입하기
        </button>
      </div>
    </main>
  );
}
