'use strict';

const { param, query } = require('express-validator');

// Validate SBD: chuỗi số, 8 ký tự
const validateSBD = [
  param('sbd')
    .trim()
    .notEmpty().withMessage('SBD không được để trống')
    .isLength({ min: 8, max: 8 }).withMessage('SBD phải có đúng 8 ký tự')
    .isNumeric().withMessage('SBD chỉ được chứa chữ số'),
];

// Validate query param subject
const validateSubjectQuery = [
  query('subject')
    .trim()
    .notEmpty().withMessage('Thiếu tham số subject')
    .isAlphanumeric('en-US', { ignore: '_' }).withMessage('subject không hợp lệ'),
];

module.exports = { validateSBD, validateSubjectQuery };
