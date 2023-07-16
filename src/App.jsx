import { useEffect, useReducer, useState } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import './App.css';
import { getAPI } from './services/getAPI';

export default function App() {
  const initialTasks = [];
  const [tasksArr, dispatch] = useReducer(tasksReducer, initialTasks)
  const [idsArr, setIdsArr] = useState([])
  const [maxId, setMaxId] = useState(0)

  useEffect(() => {
      getAPI()
      .then((data) => {
        console.log('data', data)
        dispatch({ type: 'SET_TASKS', payload: data })
      });
  }, [])

// establecer el idMaximo del array traido de forma asicrona con los 2 siguientes useEffect
  useEffect(() => {
    setIdsArr(tasksArr.map((task) => task.id))
  }, [tasksArr])

//esta fc se ejecutara luego de la anterior establezca el array de ids y calculara el siguiente id maximo
  useEffect(() => {
    setMaxId(Math.max(...idsArr) + 1)
  }, [idsArr])
  
  function handleAddTask(task) {
    dispatch({
      type: 'ADD',
      id: maxId,
      title: task.title,
      description: task.description
    })
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'UPDATE',
      task: task,
    })
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'REMOVE',
      id: taskId,
    })
  }

  function handleClick(e) {
    console.log('maxId', maxId)
  }

  return (
    <>
      <header>
        <h1>Lista de tareas</h1>
      </header>
      <AddTask onAddTask={handleAddTask} />
      <TaskList
        tasksArr={tasksArr}
        onChangeTask={handleChangeTask}
        onDeleteTask={handleDeleteTask}
      />
      <button onClick={handleClick}>ver nextId</button>
    </>
  );
}


function tasksReducer(tasksArr, action) {
  switch (action.type) {
    case 'SET_TASKS':{
      return action.payload
      
    }
    case 'ADD': {
      return [
        ...tasksArr,
        {
          id: action.id,
          title: action.title,
          description: action.description,
          done: false,
        },
      ];
    }
    case 'UPDATE': {
      return tasksArr.map((task) => {
        if (task.id === action.task.id) {
          return action.task;
        } else {
          return task;
        }
      });
    }
    case 'REMOVE': {
      return tasksArr.filter((task) => task.id !== action.id);
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}


//const initialTasks = [{ id: 0, title: 'Visit Kafka Museum', done: true }];
