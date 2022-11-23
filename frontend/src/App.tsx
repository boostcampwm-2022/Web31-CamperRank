import { Route, Routes, BrowserRouter, Navigate } from "react-router-dom";
import { Home, ProblemList, Problem } from "./pages";
import { SignUp } from "./pages/SignUp";
import { SignIn } from "./pages/SignIn";
import { useRecoilState } from "recoil";
import { useEffect, useMemo } from "react";
import { userState } from "./recoils/userState";

const App = () => {
  const [user, setUser] = useRecoilState(userState);
  const isLoggedIn = useMemo(() => user.isLoggedIn, [user.isLoggedIn]);
  const requestURL = useMemo(
    () => import.meta.env.VITE_SERVER_URL + "/auth/jwtLogin",
    []
  );

  useEffect(() => {
    const token = localStorage.getItem("camperRankToken");
    if (!token || user.isLoggedIn) {
      return;
    }
    fetch(requestURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({}),
    })
      .then((res) => {
        if (!res.ok) {
          localStorage.removeItem("camperRankToken");
          return;
        }
        return res.json().then((data) => {
          setUser({
            token,
            isLoggedIn: true,
            ID: data.userId,
          });
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        {!isLoggedIn && <Route path="/signup" element={<SignUp />} />}
        {!isLoggedIn && <Route path="/signin" element={<SignIn />} />}
        {/*{isLoggedIn && <Route path="/profile" element={<SignIn/>}/>}*/}
        <Route path="/problems" element={<ProblemList />} />
        <Route path="*" element={<Navigate to="/" />} />
        <Route path="/problem/:version/:id" element={<Problem />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
