const logReqAllUser = (req, res, next) => {
  console.log('Request ke ', req.path);
  next();
}

module.exports = logReqAllUser