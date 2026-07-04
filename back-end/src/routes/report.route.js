'use strict';

const { Router } = require('express');
const {
  getScoreLevelsBySubject,
  getAllScoreLevels,
  getTop10GroupA,
  getStudentCount,
} = require('../controllers/report.controller');
const { validateSubjectQuery } = require('../validators/student.validator');
const { validate } = require('../middlewares/validate');

const router = Router();

// GET /api/v1/reports/score-levels?subject=toan
router.get('/score-levels', validateSubjectQuery, validate, getScoreLevelsBySubject);

// GET /api/v1/reports/score-levels/all
router.get('/score-levels/all', getAllScoreLevels);

// GET /api/v1/reports/top10-group-a
router.get('/top10-group-a', getTop10GroupA);

// GET /api/v1/reports/student-count
router.get('/student-count', getStudentCount);

module.exports = router;
