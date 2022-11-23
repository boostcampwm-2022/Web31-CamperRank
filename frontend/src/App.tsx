import { Route, Routes, BrowserRouter } from "react-router-dom";
import { Home, ProblemList, Problem } from "./pages";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { useRecoilState } from "recoil";
import { getCookie } from "./utils/cookie";
import { useEffect } from "react";
import { userState } from "./recoils/userState";

const App = () => {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    const cookie = getCookie("accessToken");
    if (!cookie || user.isLoggedIn) {
      return;
    }
    //페치 날려서 정보 받고 setUser
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/problems" element={<ProblemList />} />
        <Route path="/problem/:version/:id" element={<Problem />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
