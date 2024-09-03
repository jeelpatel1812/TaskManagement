import React, {useState}  from 'react'
import Dialog from "@material-ui/core/Dialog";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import api from '../../api'
import Button from '../Button/button';

function TaskTaker(props) {

    const [openTaskTaker,  setOpenTaskTaker] = useState(true);
    const [title,  setTitle] = useState(props.taskDetails?.title || "");
    const [description,  setDescription] = useState(props.taskDetails?.description || "");
    const [dueDate,  setDueDate] = useState(props.taskDetails?.dueDate || "");
  
    const handleToClose = () =>{
      props.handleClose();
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
        // setError(error.message);
      } finally {
        // setLoading(false);
        handleToClose();
      }
    }

    const handleUpdateTask = async(taskId) =>{
      const token = localStorage.getItem('authToken');
      try {
        const response = await api.put(`/task/update/${props.taskDetails?._id}`,
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
        // setError(error.message);
      } finally {
          handleToClose();
      }
    }
    return (
        <Dialog open={props.isOpen} onClose={handleToClose}>
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
              <Button onClick={props.isUpdate ? handleUpdateTask : handleAddTask}
                  color="primary" autoFocus>
                  {props.isUpdate ? 'Update' : 'Add'}
              </Button>
          </DialogActions>
        </Dialog>
    )
}

export default TaskTaker;