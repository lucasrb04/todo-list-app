const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllLists = async (userId) => {
  const lists = await connection()
    .then((db) => db.collection('lists').find({ userID: userId }).toArray());
  return lists;
};

const createList = async (listInfo) => {
  const { name, tasks, userId } = listInfo;
  const newList = await connection()
    .then((db) => db.collection('lists')
    .insertOne({ name, tasks, userId }));

  return { list: { name, tasks, _id: newList.insertedId, userId } };
  };

const getListById = async (listInfo) => {
  if (!ObjectId.isValid(listInfo.listId)) {
    return null;
  }

  const listData = await connection()
    .then((db) => db.collection('lists')
    .findOne({ _id: ObjectId(listInfo.listId), userID: ObjectId(listInfo.userId) }));

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

const deleteList = async (id) => {
  await connection()
    .then((db) => db.collection('lists').deleteOne({ _id: ObjectId(id) }));
};

module.exports = {
  createList,
  getAllLists,
  getListById,
  updateList,
  deleteList,
};