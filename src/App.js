import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Lessons from "./pages/Lessons";
import Exercises from "./pages/Exercises";
import ExercisesResult from "./pages/ExercisesResult";
import Auth from "./admin/loginPages/Auth";
import { GlobalProvider } from "./context/GlobalState";
import Privacy from "./pages/Privacy";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <GlobalProvider>
      <ScrollToTop />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/lessons" element={<Lessons />} />
        <Route exact path="/exercises" element={<Exercises />} />
        <Route exact path="/exercises-result" element={<ExercisesResult />} />
        <Route exact path="/privacy" element={<Privacy />} />
        <Route exact path="/admin" element={<Auth />} />
      </Routes>
    </GlobalProvider>
  );
}

export default App;
