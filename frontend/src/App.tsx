import {Route, Routes, BrowserRouter} from "react-router-dom";
import {Home, ProblemList} from "./pages";
import {SignUp} from "./pages/SignUp";
import {SignIn} from "./pages/SignIn";
import {useState} from "react";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<SignUp/>}/>
        <Route path="/signin" element={<SignIn/>}/>
        <Route path="/problems" element={<ProblemList/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
