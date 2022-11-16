import { Route, Routes } from "react-router-dom";
import { MainPage } from "./pages/MainPage";
import { Home, ProblemList } from "./pages";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/problems" element={<ProblemList />} />
    </Routes>
  );
};

export default App;
