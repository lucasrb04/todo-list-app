// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const create = async (user, password) => {
  const db = await connection();
  const newUser = await db.collection('users')
    .insertOne({ user, password });
    
  return { user: { user, password, _id: newUser.insertedId } };
};

const findByEmail = async (email) => {
  const userEmail = await connection()
    .then((db) => db.collection('users').findOne({ email }));

  if (!userEmail) return null;

  return (userEmail);
};

module.exports = {
  create,
  findByEmail,
};