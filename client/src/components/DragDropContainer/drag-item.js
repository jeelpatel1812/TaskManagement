import React,{useState} from 'react';
import { useDrag } from 'react-dnd';
import './drag-item.css'
import MoreVertIcon from '@mui/icons-material/MoreVert';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import api from '../../api'; // Import the axios instance
import TaskTaker from '../TaskTaker/task-taker';
const DragItem = ({ item }) => {

    const [openTaskTaker,  setOpenTaskTaker] = useState(false);
    const handleCloseTaskTaker = () =>{
    setOpenTaskTaker(false);
    }
    const handleOpenTaskTaker = () =>{
        setOpenTaskTaker(true);
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
                <MoreVertIcon onClick={handleOpenTaskTaker}style={{height: '20px', position: 'absolute', right: '5px'}}/>
            </div>
            <div className='description'>{item.description}</div>
            <div className='dateContainer' style={{position: 'absolute', bottom: '5px', left:'5px'}}>
                <AccessTimeIcon style={{height: '15px', marginBottom: '-1px'}}/>
                {item.dueDate.substring(0,10)}
            </div>
            <TaskTaker isOpen={openTaskTaker} handleClose={handleCloseTaskTaker}/>
            <div>

            </div>
        </div>
    );
};

export default DragItem;
