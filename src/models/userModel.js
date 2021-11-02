// const { ObjectId } = require('mongodb');
const connection = require('./connection');

const createUser = async (user, password) => {
  const db = await connection();
  const newUser = await db.collection('users')
    .insertOne({ user, password });
    
  return { user, userId: newUser.insertedId, password };
};

const findByUser = async (user) => {
  const userName = await connection()
    .then((db) => db.collection('users').findOne({ user }));
  
  if (!userName) return null;

  return (userName);
};

module.exports = {
  createUser,
  findByUser,
};