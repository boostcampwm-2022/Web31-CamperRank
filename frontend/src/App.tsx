import {Route, Routes, BrowserRouter, Navigate} from "react-router-dom";
import {Home, ProblemList, Problem} from "./pages";
import {SignUp} from "./pages/SignUp";
import {SignIn} from "./pages/SignIn";
import {useRecoilValue} from "recoil";
import {userState} from "./recoils/userState";
import {setUserState} from "./hooks/useUserState";

const App = () => {
  const user = useRecoilValue(userState);
  setUserState();

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        {!user.isLoggedIn && <Route path="/signup" element={<SignUp/>}/>}
        {<Route path="/signin" element={<SignIn/>}/>}
        {/*{isLoggedIn && <Route path="/profile" element={<SignIn/>}/>}*/}
        <Route path="/problems" element={<ProblemList/>}/>
        <Route path="/problem/:version/:id" element={<Problem/>}/>
        <Route path="/problem/:version/:id/:roomNumber" element={<Problem/>}/>
        <Route path="*" element={<Navigate to="/"/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
