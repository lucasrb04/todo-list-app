const { ObjectId } = require('mongodb');
const connection = require('./connection');

const getAllLists = async () => {
  const db = await connection();
  const lists = await db.collection('lists').find().toArray();
  return lists;
};

const create = async (listInfo, userId) => {
  const { name, tasks } = listInfo;
  const db = await connection();
  const list = await db.collection('lists')
    .insertOne({ name, tasks, userId });
    return { list: { name, tasks, _id: list.insertedId, userId } };
};

const getListById = async (id) => {
  if (!ObjectId.isValid(id)) {
    return null;
  }

  const listData = await connection()
    .then((db) => db.collection('lists').findOne(new ObjectId(id)));

  if (!listData) return null;

  return listData;
};

const updateList = async (listInfo, _id) => {
  const db = await connection();
  await db.collection('lists').updateOne({ _id: ObjectId(_id) }, { $set: { ...listInfo } });

  const editedList = await getListById(_id);

  return editedList;
};

const deleteList = async (id) => {
  const db = await connection();
  await db.collection('lists').deleteOne({ _id: ObjectId(id) });
};

module.exports = {
  create,
  getAllLists,
  getListById,
  updateList,
  deleteList,
};