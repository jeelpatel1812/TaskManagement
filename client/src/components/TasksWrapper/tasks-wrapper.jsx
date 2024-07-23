import React, { useState } from 'react'
import DragAndDrop from '../DragDropContainer/drag-drop-container';
// import { connect } from 'react-redux'


export const TasksWrapper = (props) => {
  
  return (
    <div className="App">
      <DragAndDrop/>
    </div>
  );
}

const mapStateToProps = (state) => ({})

const mapDispatchToProps = {}

// export default connect(mapStateToProps, mapDispatchToProps)(TasksWrapper)
export default TasksWrapper