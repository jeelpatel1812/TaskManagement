import './App.css';
import TasksDashboard from './components/TasksDashboard/tasks-dashboard';
import UserProfile from './components/UserProfile/userProfile';
import Login from './components/Login/login';
import Signup from './components/Signup/signup';
import Header from './components/Header/header';
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/userProfile" element={<UserProfile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<TasksDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
