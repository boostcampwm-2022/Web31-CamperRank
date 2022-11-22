import {Route, Routes, BrowserRouter} from "react-router-dom";
import {Home, ProblemList} from "./pages";
import {SignUp} from "./pages/SignUp";
import {SignIn} from "./pages/SignIn";
import {useState} from "react";

const App = () => {
  const [isLoggedIn, setLoggedIn] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={isLoggedIn ? <Home/> : <SignUp/>}/>
        <Route path="/signin" element={isLoggedIn ? <Home/> : <SignIn/>}/>
        <Route path="/problems" element={<ProblemList/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
