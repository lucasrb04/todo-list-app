const httpStatus = require('http-status');

const existingFields = (entity, res) => {
  entity.forEach((value) => {
    if (!value || value === '') { 
      return res.status(httpStatus.BAD_REQUEST)
        .json({ message: 'Os campos não podem ficar vazios.' }); 
    }
});
};

const validateUser = (req, res, next) => {
  const { user, password } = req.body;
  const userInfo = [user, password];
  existingFields(userInfo, res);

  next();
};

const validateList = (req, res, next) => {
  const { name, list } = req.body;
  const listInfo = [name, list];
  existingFields(listInfo, res);

  next();
};

module.exports = {
  existingFields,
  validateUser,
  validateList,
};