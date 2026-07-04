'use strict';

const { Router } = require('express');
const studentRoute = require('./student.route');
const reportRoute = require('./report.route');
const subjectRoute = require('./subject.route');

const router = Router();

router.use('/students', studentRoute);
router.use('/reports', reportRoute);
router.use('/subjects', subjectRoute);

module.exports = router;
