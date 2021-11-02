const { ObjectId } = require('mongodb');

const connection = require('./connection');

const createList = async (listInfo) => {
  const { name, tasks, userInfo } = listInfo;
  const newList = await connection()
  .then((db) => db.collection('lists')
  .insertOne({ name, tasks, userInfo }));
  delete userInfo.userId;
  return { _id: newList.insertedId, name, tasks };
};

const getAllLists = async (userInfo) => {
  const lists = await connection()
    .then((db) => db.collection('lists')
    .find({ userInfo }, { projection: { userInfo: 0 } }).toArray());
  return lists;
};

const getListById = async (listInfo) => {
  // Valida se o listId existe. 
  if (!ObjectId.isValid(listInfo.listId)) {
    return null;
  }
  // Busca o listId no banco de dados, considerando se o usuário é o dono do listId.
  const listData = await connection()
    .then((db) => db.collection('lists')
    .findOne({ _id: ObjectId(listInfo.listId), userInfo: listInfo.userInfo },
             { projection: { userInfo: 0 } }));
             
  if (!listData) return null;

  return listData;
};

const updateList = async (listInfo) => {
  const { name, tasks } = listInfo;

  await connection()
    .then((db) => db.collection('lists')
    .updateOne({ _id: ObjectId(listInfo.listId), userInfo: listInfo.userInfo },
               { $set: { name, tasks } }));

  const editedList = await getListById(listInfo);

  return editedList;
};

const deleteList = async ({ listId }) => {
  await connection()
    .then((db) => db.collection('lists').deleteOne({ _id: ObjectId(listId) }));
};

module.exports = {
  createList,
  getAllLists,
  getListById,
  updateList,
  deleteList,
};