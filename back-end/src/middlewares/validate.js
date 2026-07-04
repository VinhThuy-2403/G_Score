'use strict';

const { validationResult } = require('express-validator');

/**
 * Middleware: chạy sau validate chain, trả 400 nếu có lỗi
 */
const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: errors.array()[0].msg,
      errors: errors.array(),
    });
  }
  next();
};

module.exports = { validate };
