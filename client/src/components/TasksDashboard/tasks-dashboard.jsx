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
import TaskTaker from '../TaskTaker/task-taker';

export const TasksDashboard = (props) => {

  const [openTaskTaker,  setOpenTaskTaker] = useState(false);
  const handleCloseTaskTaker = () =>{
    setOpenTaskTaker(false);
  }
  const handleOpenTaskTaker = () =>{
    setOpenTaskTaker(true);
  }

  return (
    <div>
        <Header/>
        <Button onClick={handleOpenTaskTaker}>Add Task</Button>
        <TaskTaker isOpen={openTaskTaker} handleClose={handleCloseTaskTaker}/>
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