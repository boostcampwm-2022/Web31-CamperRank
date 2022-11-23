import {Route, Routes, BrowserRouter, Navigate} from "react-router-dom";
import {Home, ProblemList} from "./pages";
import {SignUp} from "./pages/SignUp";
import {SignIn} from "./pages/SignIn";
import {useRecoilState} from "recoil";
import {useEffect, useMemo} from "react";
import {userState} from "./recoils/userState";

const App = () => {
  const [user, setUser] = useRecoilState(userState);
  const isLoggedIn = useMemo(() => user.isLoggedIn, [user]);

  useEffect(() => {
    const token = localStorage.getItem('camperRankToken');
    if (!token || user.isLoggedIn) {
      return;
    }
    //페치 날려서 정보 받고 setUser
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        {!isLoggedIn && <Route path="/signup" element={<SignUp/>}/>}
        {!isLoggedIn && <Route path="/signin" element={<SignIn/>}/>}
        {/*{isLoggedIn && <Route path="/profile" element={<SignIn/>}/>}*/}
        <Route path="/problems" element={<ProblemList/>}/>
        <Route path="*">
          <Navigate to="/"/>
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
