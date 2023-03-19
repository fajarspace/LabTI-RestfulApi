// log untuk requests
const logRequest = (req, res, next) => {
  console.log('Request ke', req.path);
  next();
}

module.exports = logRequest