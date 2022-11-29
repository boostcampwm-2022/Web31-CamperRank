import {Route, Routes, BrowserRouter, Navigate} from "react-router-dom";
import {Home, ProblemList, Problem} from "./pages";
import {SignUp} from "./pages/SignUp";
import {SignIn} from "./pages/SignIn";
import {useRecoilState} from "recoil";
import {useEffect, useMemo} from "react";
import {userState} from "./recoils/userState";

const App = () => {
  const [user, setUser] = useRecoilState(userState);
  const isLoggedIn = useMemo(() => user.isLoggedIn, [user.isLoggedIn]);
  useEffect(() => {
    const token = localStorage.getItem('camperRankToken');
    const camperID = localStorage.getItem('camperID');
    if (!token || !camperID || user.isLoggedIn) {
      return;
    }
    setUser({
      token,
      isLoggedIn: true,
      ID: camperID
    });
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        {!isLoggedIn && <Route path="/signup" element={<SignUp/>}/>}
        {<Route path="/signin" element={<SignIn/>}/>}
        {/*{isLoggedIn && <Route path="/profile" element={<SignIn/>}/>}*/}
        <Route path="/problems" element={<ProblemList/>}/>
        <Route path="/problem/:version/:id" element={<Problem/>}/>
        <Route path="/problem/:version/:id/:inviteLink" element={<Problem/>}/>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
