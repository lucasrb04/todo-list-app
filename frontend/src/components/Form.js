import React, { useState } from 'react';

const Form = ({ todos, setTodos }) => {
  const [inputText, setInputText] = useState('');

  const handleChange = (e) => {
    setInputText(e.target.value);
  };
  const submitTodo = (e) => {
    e.preventDefault();
    if(e.target.value !== '') {
      const now = new Date();
      setTodos([...todos, { text: inputText, completed: false, createdAt: now.getTime() }]);
      setInputText("");
    };
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
        <select name="todos" className="filter-todo">
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="uncompleted">Uncompleted</option>
        </select>
      </div>
    </form> 
  );
}

export default Form;