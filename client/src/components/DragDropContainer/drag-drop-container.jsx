//App.js

import React, { useState, useEffect } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import DragItem from './drag-item';
import DropZone from './drop-zone';
import './drag-drop-container.css';
import api from '../../api'; // Import the axios instance

const DragDropContainer = () => {

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [todoData, setTodoData] = useState([]);
    const [inProgressData, setInProgressData] = useState([]);
    const [doneData, setDoneData] = useState([]);

    const [containers, setContainers] = useState([
        { id: 'TODO', items: [] },
        { id: 'IN PROGRESS', items: [] },
        { id: 'DONE', items: [] },
        // { id: 'DONE', items: [{ id: 'item-22', title: 'Item 3', description:'this is fuckign non sencence.', dateAndTime:'20241218' }] },
    ]);

    

    useEffect(() => {
        // Replace with your API URL
        setTodoData([]);
        setInProgressData([]);
        setDoneData([]);

        const updateContainerById = (id, newItems) => {
            setContainers(prevContainers =>
              prevContainers.map(container =>
                container.id === id ? { ...container, items: newItems } : container
              )
            );
          };

        const categorizedData = (dataContainer) => {
            const tempTodoData = [];
            const tempInProgressData = [];
            const tempDoneData = [];

            dataContainer.map((data)=>{
                if(data.status === 'todo') tempTodoData.push(data);
                else if(data.status === 'inprocess') tempInProgressData.push(data);
                else if(data.status === 'done') tempDoneData.push(data);
            })

            updateContainerById('TODO', tempTodoData)
            updateContainerById('IN PROGRESS', tempInProgressData)
            updateContainerById('DONE', tempDoneData)

        }
        const fetchData = async () => {
          try {
            const response = await api.get('/task/get');
            setData(response.data);
            categorizedData(response.data);

          } catch (error) {
            setError(error.message);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
      }, []);

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

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

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
