import {Route, Routes} from "react-router-dom";
import {Home, ProblemList} from "./pages";
import {SignUp} from "./pages/SignUp";
import {SignIn} from "./pages/SignIn";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/problems" element={<ProblemList />} />
    </Routes>
  )
}

export default App;
