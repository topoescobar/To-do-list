import { useState } from 'react';

export default function TaskEdit({ task, onChangeTask, onDeleteTask }) {
  const [isEditing, setIsEditing] = useState(false);

  const handleChange = (event) => {
    let modTask = {
      ...task,
      title: event.target.value,
    };
    onChangeTask(modTask);
  };

  const handleEdit = () => {
    setIsEditing(true);
    console.log('editando: ', isEditing);
  };

  const deleteClick = () => {
    onDeleteTask(task.id);
  };
  let taskContent;
  if (isEditing) {
    taskContent = (
      <>
        <input value={task.title} onChange={handleChange} />
        <button
          onClick={() => {
            setIsEditing(false);
          }}
        >
          Guardar
        </button>
      </>
    );
  } else {
    taskContent = (
      <>
        <b className="taskTitle">{task.title}</b>
        <div className="container buttons">
          <button onClick={handleEdit}>Editar</button>
          <button onClick={deleteClick}>Eliminar</button>
        </div>
      </>
    );
  }

  return taskContent;
}
