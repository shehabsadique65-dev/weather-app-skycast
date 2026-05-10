const errorHandler = (err, req, res, next) => {
  const status = err.response?.status || err.statusCode || 500;
  const message = err.response?.data?.message || err.message || 'Internal Server Error';
  res.status(status).json({ success: false, error: message });
};
module.exports = errorHandler;
