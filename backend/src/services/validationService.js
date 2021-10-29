const userExists = (existingUser) => {
  if (existingUser) {
    return {
      number: 409,
      error: {
        message: 'Email already registered',
      },
    };
  }
};

const authenticatedLogin = (existingUser, password) => {
  if (!existingUser || existingUser.password !== password) {
    return {
      number: 401,
      error: {
        message: 'Incorrect username or password',
      },
    };
  }
};

module.exports = {
  userExists,
  authenticatedLogin,
};