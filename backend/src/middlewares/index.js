const error = require('./error');
const validate = require('./validationMidd');
const authJWT = require('./validateJWT');

module.exports = { error, validate, authJWT };
