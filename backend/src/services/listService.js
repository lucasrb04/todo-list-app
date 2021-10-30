const { listModel } = require('../models');
const validations = require('./validationService');

const createList = async (listInfo) => (listModel.createList(listInfo));

const getAllLists = async (userInfo) => listModel.getAllLists(userInfo);

const getListById = async (listInfo) => {
  // Busca lista com id requisitado
  const existingList = await listModel.getListById(listInfo);
  // Valida se o usuário existe ou não.
  const notValid = validations.listExists(existingList);
  // Caso o usuário não existe, um erro é retornado
  if (notValid) return notValid;

  return existingList;
};

const updateList = async (listInfo) => {
  // Busca lista com id requisitado
  const updatedList = await getListById(listInfo);
  // Se tiver algum erro, retorna o erro
  if (updatedList.error) return updatedList;
  // retorna a lista atualizada
  return listModel.updateList(listInfo);
};

const deleteList = async (listInfo) => {
  // Busca lista com id requisitado
  const deletedList = await getListById(listInfo);
  // Se tiver algum erro, retorna o erro
  if (deletedList.error) return deletedList;
  // se não tiver erro, deleta a lista
  await listModel.deleteList(listInfo);
  // retorna a lista deletada
  return deletedList;
};

module.exports = {
  createList,
  getAllLists,
  getListById,
  updateList,
  deleteList,
};