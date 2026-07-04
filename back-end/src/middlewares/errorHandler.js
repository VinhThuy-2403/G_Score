'use strict';

/**
 * Global error handler middleware — bắt tất cả lỗi từ next(err)
 */
// eslint-disable-next-line no-unused-vars
const errorHandler = (err, req, res, next) => {
  console.error('[ErrorHandler]', err.message || err);

  const statusCode = err.statusCode || err.status || 500;
  const message = err.message || 'Lỗi máy chủ nội bộ';

  return res.status(statusCode).json({ message });
};

module.exports = { errorHandler };
