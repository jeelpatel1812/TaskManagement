import './App.css';
import TasksDashboard from './components/TasksDashboard/tasks-dashboard';
import TasksWrapper from './components/TasksWrapper/tasks-wrapper';
import Login from './components/Login/login';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <TasksDashboard/> */}
        <Login/>
        
      </header>
    </div>
  );
}

export default App;
