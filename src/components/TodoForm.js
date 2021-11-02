import React, { useState } from 'react';

const TodoForm = ({ todos, setTodos, setStatus }) => {
  const [inputText, setInputText] = useState('');

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const submitTodo = (e) => {
    e.preventDefault();
    if(inputText) {
      const now = new Date();
      setTodos([...todos, { text: inputText, completed: false, createdAt: now.getTime() }]);
      setInputText("");
    };
  };

  const statusHlandler = (e) => {
    setStatus(e.target.value);
  };

  return (
    <form>
      <input 
        value={inputText} 
        onChange={handleChange} 
        type="text" 
        className="todo-input" 
      />
      <button onClick={submitTodo}className="todo-button" type="submit">
        <i className="fas fa-plus-square"></i>
      </button>
      <div className="select">
        <select onChange={statusHlandler} name="todos" className="filter-todo">
          <option value="byTime">Mais recente</option>
          <option value="byName">Ordem alfabética</option>
          <option value="byStatus">Completos</option>
        </select>
      </div>
    </form> 
  );
}

export default TodoForm;