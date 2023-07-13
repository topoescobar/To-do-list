import { useState } from 'react';

export default function AddTask({ onAddTask }) {
  const [text, setText] = useState('');
  return (
    <div className="container">
      <h3>Agregar tarea</h3>
      <div className="container center">
        <input
          placeholder="Titulo de la tarea"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={() => {
            setText('');
            onAddTask(text);
          }}
        >
          Agregar
        </button>
      </div>
    </div>
  );
}
