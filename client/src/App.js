import './App.css';
import TasksDashboard from './components/TasksDashboard/tasks-dashboard';
import Login from './components/Login/login';
import Signup from './components/Signup/signup';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          {/* <Route path="/" element={}> */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<TasksDashboard />} />
        {/* </Route> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
