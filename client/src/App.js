import './App.css';
import TasksDashboard from './components/TasksDashboard/tasks-dashboard';
import TasksWrapper from './components/TasksWrapper/tasks-wrapper';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <TasksDashboard/>
        
      </header>
    </div>
  );
}

export default App;
