const rescue = require('express-rescue');
const httpStatus = require('http-status');

const { listService } = require('../services');

const createList = rescue(async (req, res, next) => {
  const listInfo = req.body;

  const newList = await listService.createList(listInfo);

  if (newList.error) return next(newList);

  return res.status(httpStatus.CREATED).json(newList);
});

const getAllLists = rescue(async (req, res, _next) => {
  const { userId } = req.body;
  const lists = await listService.getAllLists(userId);

  return res.status(httpStatus.OK).json(lists);
});

const getListById = rescue(async (req, res, next) => {
  const { listId } = req.params;
  const listInfo = { ...req.body, listId };
  
  const list = await listService.getListById(listInfo);

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

  return res.status((httpStatus.OK)).send({ message: 'Lista deletada com sucesso' });
});

module.exports = {
  createList,
  getAllLists,
  getListById,
  updateList,
  deleteList,
};
