import TaskEdit from './TaskEdit';

export default function Task({ task, onChangeTask, onDeleteTask }) {
  const handleCheckbox = (event) => {
    let modTask = {
      ...task,
      done: event.target.checked,
    };
    onChangeTask(modTask);
  };

  return (
    <div className="container">
      <label>
        {task.id + ' '}
        <input type="checkbox" checked={task.done} onChange={handleCheckbox} />
        <TaskEdit
          task={task}
          onChangeTask={onChangeTask}
          onDeleteTask={onDeleteTask}
        />
      </label>
    </div>
  );
}
