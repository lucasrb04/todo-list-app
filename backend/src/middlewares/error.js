// hello-msc/middlewares/error.js
module.exports = (err, _req, res, _next) => {
  if (err.number) {
  return res.status(err.number).json(err.error);
  } 
  return res.status(500).json({ err });
};