import { useEffect, useReducer, useState } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import './App.css';

export default function App() {
  const initialTasks = [];
  const [nextId, setNextId] = useState(0)
  const [tasksArr, dispatch] = useReducer(tasksReducer, initialTasks)
  const [idsArr, setIdsArr] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/api/tasks/')
      .then((response) => response.json())
      .then((json) => {
        console.log('json', json)
        dispatch({ type: 'SET_TASKS', payload: json })
      });
  }, [])

  function handleAddTask(title) {
    setIdsArr(tasksArr.map((task) => task.id))
    setNextId(Math.max(idsArr) + 1)
    dispatch({
      type: 'ADD',
      id: nextId,
      title: title,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'UPDATE',
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'REMOVE',
      id: taskId,
    });
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
