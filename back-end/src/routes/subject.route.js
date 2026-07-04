'use strict';

const { Router } = require('express');
const { getSubjects } = require('../controllers/report.controller');

const router = Router();

// GET /api/v1/subjects
router.get('/', getSubjects);

module.exports = router;
