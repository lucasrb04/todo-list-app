import React from 'react';
import TodoItem from './TodoItem';

const TodoList = ({todos, setTodos, filteredTodos}) => {

  return (
    <div className="todo-container">
      <ul className="todo-list">
        {filteredTodos.map((todo) => (
          <TodoItem 
            key={todo.createdAt} 
            todos={todos}
            setTodos={setTodos}
            todo={todo}
          />
        ))}
      </ul>
    </div>
  );
};

export default TodoList;