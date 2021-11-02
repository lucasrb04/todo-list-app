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
  const { userInfo } = req.body;
  const lists = await listService.getAllLists(userInfo);

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
  // Pegando id da url da requisição
  const { listId } = req.params;
  //  Criando objeto com id da lista e as informações do usuário vinda da autenticaçãoJWT 
  const listInfo = { ...req.body, listId };
  // Atualizando lista
  const updatedList = await listService.updateList(listInfo);
  // Verificando se houve erro
  if (updatedList.error) return next(updatedList);
  // Retornando status de sucesso e a lista atualizada 
  return res.status(httpStatus.OK).json(updatedList);
});

const deleteList = rescue(async (req, res, next) => {
  // Pegando id da url da requisição
  const { listId } = req.params;
  //  Criando objeto com id da lista e as informações do usuário vinda da autenticaçãoJWT 
  const listInfo = { ...req.body, listId };
  // Deletando lista
  const deletedList = await listService.deleteList(listInfo);
  // Verificando se a lista foi deletada
  if (deletedList.error) return next(deletedList);
  // Retornando status de sucesso
  return res.status((httpStatus.OK)).send({ message: 'Lista deletada com sucesso' });
});

module.exports = {
  createList,
  getAllLists,
  getListById,
  updateList,
  deleteList,
};
