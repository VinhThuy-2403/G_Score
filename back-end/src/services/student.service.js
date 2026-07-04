'use strict';

const { Student, Score, Subject } = require('../models');

class StudentService {
  /**
   * Tra cứu điểm theo số báo danh
   * @param {string} sbd
   * @returns {{ sbd: string, scores: Array<{subject: string, subjectName: string, score: number|null}> }}
   */
  async findBySBD(sbd) {
    const student = await Student.findOne({
      where: { sbd },
      include: [
        {
          model: Score,
          as: 'scores',
          include: [
            {
              model: Subject,
              as: 'subject',
              attributes: ['code', 'name'],
            },
          ],
        },
      ],
    });

    if (!student) return null;

    const scores = student.scores.map((s) => ({
      subject: s.subject.code,
      subjectName: s.subject.name,
      score: s.score !== null ? parseFloat(s.score) : null,
    }));

    return { sbd: student.sbd, scores };
  }
}

module.exports = new StudentService();
