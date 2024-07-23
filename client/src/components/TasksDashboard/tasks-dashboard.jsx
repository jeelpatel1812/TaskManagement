import PropTypes from 'prop-types'
import React from 'react'
import TasksWrapper from '../TasksWrapper/tasks-wrapper';
import Button from '../Button/button';
import SearchBar from '../SearchBar/searchBar';
// import { connect } from 'react-redux'


export const TasksDashboard = (props) => {

  const clickMe = () => {
    return ;
  }
  return (
    <div>
        
        <Button onClick={clickMe}>Add Task</Button>
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