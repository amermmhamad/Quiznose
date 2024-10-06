import "./App.css";
import "./index.css";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import Homepage from "./screens/homepage";
import Category from "./screens/category";
import Difficulty from "./screens/difficulty";
import Quiz from "./screens/quiz";
import { AppContextProvider } from "./context/AppContext";

function App() {
  return (
    <div className="w-full h-full bg-[#FAF9F6]">
      <AppContextProvider>
        <Router>
          <Routes>
            <Route exact path="/" element={<Homepage />} />
            <Route exact path="/category" element={<Category />} />
            <Route exact path="/difficulty" element={<Difficulty />} />
            <Route exact path="/quiz" element={<Quiz />} />
          </Routes>
        </Router>
      </AppContextProvider>
    </div>
  );
}

export default App;
