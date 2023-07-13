import Task from './Task';
//import { useState } from "react";

export default function TaskList({ tasksArr, onChangeTask, onDeleteTask }) {
  return (
    <div className="container">
      <h3>Tareas: </h3>
    <ul>
      {tasksArr.map((task) => (
        <li key={task.id}>
          <Task
            task={task}
            onChangeTask={onChangeTask}
            onDeleteTask={onDeleteTask}
          />
        </li>
      ))}
    </ul>
    </div>
  );
}
