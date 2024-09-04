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
        { id: 'IN PROCESS', items: [] },
        { id: 'DONE', items: [] },
        // { id: 'DONE', items: [{ id: 'item-22', title: 'Item 3', description:'this is fuckign non sencence.', dateAndTime:'20241218' }] },
    ]);

    const fetchData = async () => {
        // if(data.length) return;
        console.log("called once", data)
        const token = localStorage.getItem('authToken');
        try {
        const response = await api.get('/task/get', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setData(response.data);
        categorizedData(response.data);

        } catch (error) {
        setError(error.message);
        } finally {
        setLoading(false);
        }
    };

    const categorizedData = (dataContainer, item, target) => {
        const tempTodoData = [];
        const tempInProgressData = [];
        const tempDoneData = [];

        dataContainer.map((data)=>{
            if(data._id == item?._id) {
                if(target == 'TODO') tempTodoData.push(data);
                else if(target == 'IN PROCESS') tempInProgressData.push(data);
                else tempDoneData.push(data);
            }
            else if(data.status === 'TODO') tempTodoData.push(data);
            else if(data.status === 'IN PROCESS') tempInProgressData.push(data);
            else if(data.status === 'DONE') tempDoneData.push(data);
        })

        updateContainerById('TODO', tempTodoData)
        updateContainerById('IN PROCESS', tempInProgressData)
        updateContainerById('DONE', tempDoneData)

        if(target){
            try{
                const token = localStorage.getItem('authToken');
                const response = api.patch(`/task/updateStatus/${item?._id}`,
                {
                    status: target == 'TODO' ? 'TODO' : ( target ==  'IN PROCESS' ? 'IN PROCESS' : 'DONE')
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                    
                });
            }
            catch(err) {
                console.log("Error: ", err);
            }
            finally{
                const updatedData = [];
                containers.map((categoryItem)=>{
                    categoryItem?.items.map((item)=> updatedData.push(item));
                })
                setData(updatedData);
            }
        }

    }

    const updateContainerById = (id, newItems) => {
        setContainers(prevContainers =>
          prevContainers.map(container =>
            container.id === id ? { ...container, items: newItems } : container
          )
        );
      };

    useEffect(() => {
        // Replace with your API URL
        setTodoData([]);
        setInProgressData([]);
        setDoneData([]);
        fetchData();
      }, []);

    const handleDrop = (item, containerId) => {
        
        categorizedData(data, item, containerId);
    };

    const handleDeleteTask = async(taskId) =>{
        const token = localStorage.getItem('authToken');
        try{
            const response = await api.delete(`/task/delete/${taskId}`,
            {   
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            console.log("check response", response);
        }
        catch(err){

        }
        
    }

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
                                    <DragItem key={item.id} item={item} handleDeleteTask={handleDeleteTask}/>
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
