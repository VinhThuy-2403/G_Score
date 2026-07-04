'use strict';

const studentService = require('../services/student.service');

const getStudentByBSD = async (req, res, next) => {
  try {
    const { sbd } = req.params;
    const student = await studentService.findBySBD(sbd);
    if (!student) {
      return res.status(404).json({ message: 'Không tìm thấy thí sinh' });
    }
    return res.json(student);
  } catch (err) {
    next(err);
  }
};

module.exports = { getStudentByBSD };
