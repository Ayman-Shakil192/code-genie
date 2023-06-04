import { Routes, Route, BrowserRouter as Router } from "react-router-dom";
import "./App.css";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Dashboard from "./components/Dashboard/Dashboard";
import Compiler from "./components/Compiler/Compiler";
import History from "./components/History/History";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/compiler" element={<Compiler />} />
          <Route path="/history" element={<History />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
