const rescue = require('express-rescue');
const httpStatus = require('http-status');

const { listService } = require('../services');

const createList = rescue(async (req, res, next) => {
  const listInfo = req.body;
  const { userId } = req;

  const newList = await listService.createList(listInfo, userId);

  if (newList.error) return next(newList);

  return res.status(httpStatus.CREATED).json(newList);
});

const getAllLists = rescue(async (_req, res, _next) => {
  const lists = await listService.getAllLists();

  return res.status(httpStatus.OK).json(lists);
});

const getListById = rescue(async (req, res, next) => {
  const { id } = req.params;
  const list = await listService.getListById(id);

  if (list.error) return next(list);

  return res.status(httpStatus.OK).json(list);
});

const updateList = rescue(async (req, res, next) => {
  const { id } = req.params;
  const list = req.body;
  
  const updatedList = await listService.updateList(list, id);
  
  if (updatedList.error) return next(updatedList);

  return res.status(httpStatus.OK).json(updatedList);
});

const deleteList = rescue(async (req, res, next) => {
  const { id } = req.params;
  
  const deletedList = await listService.deleteList(id);

  if (deletedList.error) return next(deletedList);

  return res.status((httpStatus.OK)).send({ message: 'List deleted' });
});

module.exports = {
  createList,
  getAllLists,
  getListById,
  updateList,
  deleteList,
};
