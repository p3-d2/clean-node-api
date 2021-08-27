module.exports = (_, res, next) => {
  res.type('json')
  next()
}
