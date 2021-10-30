const { ObjectId } = require('mongodb');

const connection = require('./connection');

const createList = async (listInfo) => {
  const { name, tasks, userInfo } = listInfo;
  const { user } = userInfo;
  const newList = await connection()
  .then((db) => db.collection('lists')
  .insertOne({ name, tasks, userInfo }));
  
  return { _id: newList.insertedId, name, tasks, user };
};

const getAllLists = async (userInfo) => {
  const lists = await connection()
    .then((db) => db.collection('lists').find({ userInfo }, { _id: 0, userInfo: 0 }).toArray());
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
    .findOne({ _id: ObjectId(listInfo.listId), userInfo: listInfo.userInfo }));
  if (!listData) return null;

  return listData;
};

const updateList = async (listInfo, _id) => {
    await connection()
    .then((db) => db.collection('lists')
    .updateOne({ _id: ObjectId(_id) }, { $set: { ...listInfo } }));

  const editedList = await getListById(_id);

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