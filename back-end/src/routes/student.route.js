'use strict';

const { Router } = require('express');
const { getStudentByBSD } = require('../controllers/student.controller');
const { validateSBD } = require('../validators/student.validator');
const { validate } = require('../middlewares/validate');

const router = Router();

// GET /api/v1/students/:sbd
router.get('/:sbd', validateSBD, validate, getStudentByBSD);

module.exports = router;
