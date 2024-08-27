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
    const [title,  setTitle] = useState("");
    const [description,  setDescription] = useState("");
    const [dueDate,  setDueDate] = useState("");
  
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
              <Button onClick={handleAddTask}
                  color="primary" autoFocus>
                  Add
              </Button>
          </DialogActions>
        </Dialog>
    )
}

export default TaskTaker;