import { useState } from 'react';
import { postAPI } from './services/postAPI';

export default function AddTask({ onAddTask }) {
  const emptyTask = {
    title: '',
    description: ''
  }
  const [task, setTask] = useState(emptyTask)
 
  const handleClick = () => {
    postAPI(task).then((response) => {
      onAddTask(response)
      setTask(emptyTask)
    })
  }

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value
    })
  }

  return (
    <div className="container">
      <h3>Agregar tarea</h3>
      <div className="container center">
        <input
          placeholder="Titulo de la tarea"
          name='title'
          value={task.title}
          onChange={handleChange}
        />
        <input 
          placeholder='Descripcion de la tarea'
          name='description'
          value={task.description}
          onChange={handleChange}
        />
        <button onClick={handleClick}>
          Agregar
        </button>
      </div>
    </div>
  );
}
