const { listModel } = require('../models');

const createList = async (listInfo) => (listModel.create(listInfo));

const getAllLists = async (userId) => listModel.getAllLists(userId);

const getListById = async (listInfo) => {
  const list = await listModel.getListById(listInfo);

  if (!list) {
    return {
      number: 404,
      error: {
        message: 'list not found',
      },
    };
  }

  return list;
};

const updateList = async (listInfo, id) => {
  const getList = await getListById(id);

  if (getList.error) return getList;
  
  return listModel.updateList(listInfo, id);
};

const deleteList = async (id) => {
  const deletedList = await getListById(id);

  if (deletedList.error) return deletedList;

  listModel.deleteList(id);

  return deletedList;
};

module.exports = {
  createList,
  getAllLists,
  getListById,
  updateList,
  deleteList,
};