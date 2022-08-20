import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Register from "./components/Register";
import Login from "./components/Login";
import Reset from "./components/Reset";
import User from "./components/User";
import Spinner from "./components/Spinner";
// import AOS from "aos";
// import "aos/dist/aos.css";

function App() {
  // AOS.init();
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reset" element={<Reset />} />
          <Route path="/user" element={<User />} />
          <Route path="/spin" element={<Spinner />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
