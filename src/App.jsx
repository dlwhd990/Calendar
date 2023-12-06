import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FindPage from "./components/FindPage";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import MainLayout from "./pages/MainLayout";

function App() {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route path="/" element={<Login />}></Route>
        <Route path="/signup" element={<SignUp />}></Route>
        <Route path="/find" element={<FindPage />}></Route>
        <Route path="/date" element={<MainLayout />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
