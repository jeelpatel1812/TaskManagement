import React from 'react';
import { useDrop } from 'react-dnd';
import './drag-zone.css'
const DropZone = ({ children, containerId, onDrop }) => {
    const [{ isOver }, drop] = useDrop(() => ({
        accept: 'item',
        drop: (item) => onDrop(item, containerId),
        collect: (monitor) => ({
            isOver: monitor.isOver(),
        }),
    }));

    return (
        <div
            ref={drop}
            className="drop-zone"
            style={{
                borderColor: isOver ? 'green' : 'black',
                minHeight:'250px'
            }}
        >
            {children}
        </div>
    );
};

export default DropZone;
