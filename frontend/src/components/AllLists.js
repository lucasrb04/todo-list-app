import React, { useState } from 'react';
import { Redirect } from 'react-router';
import { deleteList, createList } from '../service/api';

const AllLists = ({ lists, setLists, token, authenticateNFetch }) => {

  const [redirect, setRedirect] = useState(false);
  const [listId, setListId] = useState('');

  const deleteHandler = async(id) => {
    const response = await deleteList({token, id});
    console.log(response.status);
    if(response.message === 'Lista deletada com sucesso') {
      // para atualizar a lista de tarefas
      setLists([...lists.filter(list => list._id !== id)]);
    }
  }

  const addHandler = async() => {
    const response = await createList({token});
    if(response._id) {
      setListId(response._id);
      setRedirect(true)
    }
  }

  const editHlandler = (listId) => {
    setListId(listId);
    setRedirect(true)
  }

  return (
    <div className="todo-container">
      {redirect && <Redirect to={`/list/${listId}` }/>}
      <button 
        onClick={addHandler}
        className="add-btn complete-btn" 
        type="submit"
      >
      Nova lista
      </button>
      <ul className="todo-list">
        {lists.map(list => (
        <div key={list._id} className="todo">
          <li className={'todo-item'}>{list.name}</li>
          <button onClick={()=> {editHlandler(list._id)}} className="edit-btn">
            <i className="fas fa-edit"></i>
          </button>
          <button onClick={()=> {deleteHandler(list._id)}} className="trash-btn">
            <i className="fas fa-trash"></i>
          </button>
        </div>
        ))}
      </ul>
    </div>
  );
};

export default AllLists;