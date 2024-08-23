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


export const TasksDashboard = (props) => {

  const [newTaskTaker,  setNewTaskTaker] = useState(false);
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
        title: 'hasd',
        description: 'mmzx',
        createdAt: new Date(),
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
                <DialogTitle>{"How are you?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        I am Good, Hope the same for you!
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