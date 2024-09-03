import React, { useState } from 'react'
import DragAndDrop from '../DragDropContainer/drag-drop-container';
import TaskTaker from '../TaskTaker/task-taker';
// import { connect } from 'react-redux'


export const TasksWrapper = (props) => {
  const [openTaskTaker,  setOpenTaskTaker] = useState(false);
  const handleCloseTaskTaker = () =>{
  setOpenTaskTaker(false);
  }
  return (
    <div className="App">
      <DragAndDrop/>
      <TaskTaker isOpen={openTaskTaker} handleClose={handleCloseTaskTaker}/>
    </div>
  );
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

// export default connect(mapStateToProps, mapDispatchToProps)(TasksWrapper)
export default TasksWrapper