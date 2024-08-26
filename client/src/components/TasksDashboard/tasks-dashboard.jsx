import PropTypes from 'prop-types'
import React, {useState} from 'react'
import TasksWrapper from '../TasksWrapper/tasks-wrapper';
import Button from '../Button/button';
import SearchBar from '../SearchBar/searchBar';
import Header from '../Header/header';
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import api from '../../api'
import { connect } from 'react-redux'
import './tasks-dashboard.css'

export const TasksDashboard = (props) => {

  const [newTaskTaker,  setNewTaskTaker] = useState(false);
  const [title,  setTitle] = useState("");
  const [description,  setDescription] = useState("");
  const [dueDate,  setDueDate] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const handleToClose = () =>{
    setNewTaskTaker(false);
  }
  const handleToOpen = () =>{
    setNewTaskTaker(true);
  }

  const handleAddTask = async() =>{
    const token = localStorage.getItem('authToken');
    try {
      const response = await api.post('/task/add',
      {
        title: title,
        description: description,
        createdAt: new Date(),
        dueDate: dueDate,
        status: 'todo'
      },
      {
        headers: {
            Authorization: `Bearer ${token}`
        },
      });

    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  }

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <div>
        <Header/>
        <Button onClick={handleToOpen}>Add Task</Button>
        <Dialog open={newTaskTaker} onClose={handleToClose}>
                <DialogTitle>Task</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                      <div className="form-group">
                        <label>Title</label>
                        <input
                          type="string"
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Description</label>
                        <input
                          type="text"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          required
                        />
                      </div>
                      <div className="form-group">
                        <label>Due date</label>
                        <input
                          type="date"
                          value={dueDate}
                          onChange={(e) => setDueDate(e.target.value)}
                          required
                        />
                      </div>
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleAddTask}
                        color="primary" autoFocus>
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        <SearchBar/>
        <TasksWrapper/>
    </div>
  )
}

TasksDashboard.propTypes = {
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

export default TasksDashboard;
// export default connect(mapStateToProps, mapDispatchToProps)(tasks-dashboard)