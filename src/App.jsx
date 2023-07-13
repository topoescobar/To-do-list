import { useReducer } from 'react';
import AddTask from './AddTask';
import TaskList from './TaskList';
import './App.css';

function tasksReducer(tasksArr, action) {
  switch (action.type) {
    case 'added': {
      console.log('case added', tasksArr);
      return [
        ...tasksArr,
        {
          id: action.id,
          title: action.title,
          done: false,
        },
      ];
    }
    case 'changed': {
      return tasksArr.map((task) => {
        if (task.id === action.task.id) {
          return action.task;
        } else {
          return task;
        }
      });
    }
    case 'deleted': {
      return tasksArr.filter((task) => task.id !== action.id);
    }

    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}

export default function App() {
  const [tasksArr, dispatch] = useReducer(tasksReducer, initialTasks);

  fetch('http://localhost:3001/api/tasks/')
    .then((response) => response.json())
    .then((json) => {
      console.log('json', json);
    });

  function handleAddTask(title) {
    dispatch({
      type: 'added',
      id: nextId++,
      title: title,
    });
  }

  function handleChangeTask(task) {
    dispatch({
      type: 'changed',
      task: task,
    });
  }

  function handleDeleteTask(taskId) {
    dispatch({
      type: 'deleted',
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

const initialTasks = [{ id: 0, title: 'Visit Kafka Museum', done: true }];

const idsArr = initialTasks.map((task) => task.id);
let nextId = Math.max(...idsArr) + 1;
