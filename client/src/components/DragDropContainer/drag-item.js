import React,{useState} from 'react';
import { useDrag } from 'react-dnd';
import './drag-item.css'
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import api from '../../api'; // Import the axios instance
import TaskTaker from '../TaskTaker/task-taker';
import DragItemMenu from '../DragItemMenu/dragItemMenu';
const DragItem = ({ item, handleDeleteTask }) => {

    const [openTaskTaker,  setOpenTaskTaker] = useState(false);
    const handleUpdateTask = () =>{
        setOpenTaskTaker(true);
    }
    const handleCloseTaskTaker = () =>{
        setOpenTaskTaker(false);
    }
    const handleDeleteTaskFunc = async(task) =>{
        handleDeleteTask(item._id);
    }

    const [{ isDragging }, drag] = useDrag(() => ({
        type: 'item',
        item: { ...item },
        collect: (monitor) => ({
            isDragging: monitor.isDragging(),
        }),
    }));

    return (
        <div
            ref={drag}
            className='drag-item'
            style={{
                opacity: isDragging ? 0.5 : 1,
            }}
        >
            <div className='title'>
                {item.title}
                <DragItemMenu 
                    handleUpdate={handleUpdateTask}
                    handleDelete={(item)=> handleDeleteTaskFunc(item)}
                />
            </div>
            <div className='description'>{item.description}</div>
            <div className='dateContainer' style={{position: 'absolute', bottom: '5px', left:'10px'}}>
                {/* <AccessTimeIcon style={{height: '15px', marginBottom: '-2px'}}/> */}
                <b>Due date : </b> 
                {item.dueDate.substring(0,10)}
            </div>
      
            <div>

            <TaskTaker isOpen={openTaskTaker} handleClose={handleCloseTaskTaker} taskDetails={item} isUpdate={true}/>

            </div>
        </div>
    );
};

export default DragItem;
