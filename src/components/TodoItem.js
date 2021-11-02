import React from 'react';

const TodoItem = ({todos, todo, setTodos}) => {
  //events
  const deleteHandler = () => {
    setTodos(todos.filter(el => el.createdAt !== todo.createdAt));
  }
  const completeHandler = () => {
    setTodos(todos.map((el) => {
      if (el.createdAt === todo.createdAt) {
        return {
          ...el,
          completed: !el.completed
        }
      }
      return el;
    }));
  }

  return (
    <div className="todo">
      <li className={`todo-item ${todo.completed && "completed"}`}>{todo.text}</li>
      <button onClick={completeHandler} className="complete-btn">
        <i className="fas fa-check"></i>
      </button>
      <button onClick={deleteHandler} className="trash-btn">
        <i className="fas fa-trash"></i>
      </button>
    </div>
  );
};

export default TodoItem;