//App.js

import React, { useState } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragItem from './drag-item';
import DropZone from './drop-zone';
import './drag-drop-container.css'

const DragDropContainer = () => {
    const [containers, setContainers] = useState([
        { id: 'TODO', items: [{ id: 'item-1', title: 'Item 1', description:'this is fuckign non sencence.', dateAndTime:'20241218'  }, { id: 'item-2', title: 'Item 2', description:'this is fuckign non sencence.', dateAndTime:'20241218' }] },
        { id: 'IN PROGRESS', items: [{ id: 'item-3', title: 'Item 3', description:'this is fuckign non sencence.', dateAndTime:'20241218' }] },
        { id: 'DONE', items: [{ id: 'item-22', title: 'Item 3', description:'this is fuckign non sencence.', dateAndTime:'20241218' }] },
    ]);

    const handleDrop = (item, containerId) => {
        setContainers((prevContainers) => {
            const updatedContainers = prevContainers.map((container) => {
                if (container.items.find((i) => i.id === item.id)) {
                    return { ...container, items: container.items.filter((i) => i.id !== item.id) };
                }
                if (container.id === containerId) {
                    return { ...container, items: [...container.items, item] };
                }
                return container;
            });
            return updatedContainers;
        });
    };

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="app">
                <div className="container-wrapper">
                    {containers.map((container) => (
                        <div key={container.id} className="container">
                            <div className='title'>{container.id}</div>
                            <DropZone containerId={container.id} onDrop={handleDrop}>
                                {container.items.map((item) => (
                                    <DragItem key={item.id} item={item} />
                                ))}
                            </DropZone>
                        </div>
                    ))}
                </div>
            </div>
        </DndProvider>
    );
};

export default DragDropContainer;
