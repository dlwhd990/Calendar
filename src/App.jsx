import "./App.css";
import { Routes, Route } from "react-router-dom";
import FindPage from "./components/FindPage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import MainLayout from "./pages/MainLayout";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/find" element={<FindPage />}></Route>
        <Route path="/date" element={<MainLayout />}></Route>
      </Routes>
    </div>
  );
}

export default App;
