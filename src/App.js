import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import HomeTurkish from "./pages/HomeTurkish";
import Lessons from "./pages/Lessons";
import Exercises from "./pages/Exercises";
import ExercisesResult from "./pages/ExercisesResult";
import Auth from "./admin/loginPages/Auth";

function App() {
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/tr" element={<HomeTurkish />} />
        <Route exact path="/lessons" element={<Lessons />} />
        <Route exact path="/exercises" element={<Exercises />} />
        <Route exact path="/exercises-result" element={<ExercisesResult />} />
        <Route exact path="/admin" element={<Auth />} />
      </Routes>
    </div>
  );
}

export default App;
