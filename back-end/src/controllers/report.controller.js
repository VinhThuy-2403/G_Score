'use strict';

const reportService = require('../services/report.service');
const { Subject, Student } = require('../models');

const getScoreLevelsBySubject = async (req, res, next) => {
  try {
    const { subject } = req.query;
    const result = await reportService.getScoreLevels(subject);
    if (!result) {
      return res.status(404).json({ message: 'Không tìm thấy môn học' });
    }
    return res.json(result);
  } catch (err) {
    next(err);
  }
};

const getAllScoreLevels = async (req, res, next) => {
  try {
    const result = await reportService.getAllScoreLevels();
    return res.json(result);
  } catch (err) {
    next(err);
  }
};

const getTop10GroupA = async (req, res, next) => {
  try {
    const result = await reportService.getTop10GroupA();
    return res.json(result);
  } catch (err) {
    next(err);
  }
};

const getSubjects = async (req, res, next) => {
  try {
    const subjects = await Subject.findAll({
      attributes: ['code', 'name', 'group_a'],
      order: [['id', 'ASC']],
    });
    return res.json(subjects);
  } catch (err) {
    next(err);
  }
};

const getStudentCount = async (req, res, next) => {
  try {
    const count = await Student.count();
    return res.json({ count });
  } catch (err) {
    next(err);
  }
};

module.exports = { getScoreLevelsBySubject, getAllScoreLevels, getTop10GroupA, getSubjects, getStudentCount };
