import {Route, Routes} from "react-router-dom";
import {MainPage} from "./pages/MainPage";
import { Home } from "./pages";

const App = () => {
    return (
            <Routes>
                <Route path="/" element={<Home/>}/>
            </Routes>
    )
}

export default App
