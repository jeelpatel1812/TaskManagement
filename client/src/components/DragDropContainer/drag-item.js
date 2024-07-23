import React from 'react';
import { useDrag } from 'react-dnd';
import './drag-item.css'
const DragItem = ({ item }) => {
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
            <div className='title'>{item.title}</div>
            <div className='description'>{item.description}</div>
            <div className='date'>{item.dateAndTime}</div>
            <div>

            </div>
        </div>
    );
};

export default DragItem;
