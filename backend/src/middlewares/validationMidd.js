const existingFields = (entity, res) => {
  entity.forEach((value) => {
    if (!value || value === '') { 
      return res.status(400).json({ message: 'Invalid entries. Try again.' }); 
    }
});
};

const createUser = (req, res, next) => {
  const { name, email, password } = req.body;
  const user = [name, email, password];
  existingFields(user, res);

  const emailRegex = new RegExp(/[a-z0-9]+@[a-z0-9]+\.[a-z0-9]{2,3}(\.[a-z0-9]+)?$/);

  if (!emailRegex.test(email)) { 
    return res.status(400).json({ message: 'Invalid entries. Try again.' }); 
}
  next();
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  const user = [email, password];
  user.forEach((value) => {
    if (!value || value === '') { 
      return res.status(401).json({ message: 'All fields must be filled' }); 
    }
  });

  next();
};

const createRecipe = (req, res, next) => {
  const { name, ingredients, preparation } = req.body;
  const recipe = [name, ingredients, preparation];
  existingFields(recipe, res);

  next();
};

const validateImg = (req, res, next) => {
  if (req.file.mimetype !== 'image/jpeg') {
    return res.status(400).json({ message: 'Wrong file format' }); 
  }
  next();
};

module.exports = {
  createUser,
  login,
  createRecipe,
  validateImg,
};