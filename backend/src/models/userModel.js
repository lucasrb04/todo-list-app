// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (name, email, password) => {
  const db = await connection();
  const product = await db.collection('users')
    .insertOne({ name, email, password, role: 'user' });
    return { user: { name, email, role: 'user', _id: product.insertedId } };
};

const findByEmail = async (email) => {
  const userEmail = await connection()
    .then((db) => db.collection('users').findOne({ email }));

  // Caso nenhum product seja encontrado, devolvemos null
  if (!userEmail) return null;

  // Caso contrário, retornamos o produto encontrado
  return (userEmail);
};

module.exports = {
  create,
  findByEmail,
};