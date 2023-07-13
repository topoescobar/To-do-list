import Task from './Task';
//import { useState } from "react";

export default function TaskList({ tasksArr, onChangeTask, onDeleteTask }) {
  return (
    <ul className="container">
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
  );
}
