import { useEffect, useReducer, useState } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import './App.css';

export default function App() {
  const initialTasks = [];
  const [tasksArr, dispatch] = useReducer(tasksReducer, initialTasks)
  const [idsArr, setIdsArr] = useState([])
  const [maxId, setMaxId] = useState(0)

  useEffect(() => {
    fetch('http://localhost:3001/api/tasks/')
      .then((response) => response.json())
      .then((json) => {
        console.log('json', json)
        dispatch({ type: 'SET_TASKS', payload: json })
      });
  }, [])

  useEffect(() => {
    setIdsArr(tasksArr.map((task) => task.id))
  }, [tasksArr])

  useEffect(() => {
    setMaxId(Math.max(...idsArr) + 1)
  }, [idsArr])
  
  function handleAddTask(title) {
    
    dispatch({
      type: 'ADD',
      id: maxId,
      title: title,
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
