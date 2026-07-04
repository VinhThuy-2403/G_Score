'use strict';

const { Subject, Score, Student, sequelize } = require('../models');
const { Op, fn, col, literal } = require('sequelize');

class ReportService {
  /**
   * Thống kê 4 mức điểm cho 1 môn
   * @param {string} subjectCode
   * @returns {{ subject: string, subjectName: string, levels: object }}
   */
  async getScoreLevels(subjectCode) {
    const subject = await Subject.findOne({ where: { code: subjectCode } });
    if (!subject) return null;

    const rows = await Score.findAll({
      where: {
        subject_id: subject.id,
        score: { [Op.not]: null },
      },
      attributes: ['score'],
      raw: true,
    });

    const levels = { gte8: 0, from6to8: 0, from4to6: 0, lt4: 0 };
    for (const row of rows) {
      const s = parseFloat(row.score);
      if (s >= 8) levels.gte8++;
      else if (s >= 6) levels.from6to8++;
      else if (s >= 4) levels.from4to6++;
      else levels.lt4++;
    }

    return { subject: subject.code, subjectName: subject.name, levels };
  }

  /**
   * Thống kê 4 mức điểm cho tất cả môn
   * @returns {Array}
   */
  async getAllScoreLevels() {
    const subjects = await Subject.findAll({ order: [['id', 'ASC']] });
    const results = await Promise.all(
      subjects.map((s) => this.getScoreLevels(s.code))
    );
    return results.filter(Boolean);
  }

  /**
   * Top 10 thí sinh khối A (Toán + Vật lí + Hóa học)
   * Loại thí sinh thiếu bất kỳ môn nào trong 3 môn
   * @returns {Array}
   */
  async getTop10GroupA() {
    // Lấy IDs của 3 môn khối A
    const groupASubjects = await Subject.findAll({
      where: { group_a: true },
      attributes: ['id', 'code', 'name'],
    });

    if (groupASubjects.length < 3) return [];

    const subjectIds = groupASubjects.map((s) => s.id);
    const idToCode = {};
    groupASubjects.forEach((s) => { idToCode[s.id] = s.code; });

    // Tìm student_ids có đủ 3 điểm không null
    const eligible = await Score.findAll({
      where: {
        subject_id: { [Op.in]: subjectIds },
        score: { [Op.not]: null },
      },
      attributes: ['student_id', 'subject_id', 'score'],
      raw: true,
    });

    // Group theo student_id
    const studentScoreMap = {};
    for (const row of eligible) {
      if (!studentScoreMap[row.student_id]) {
        studentScoreMap[row.student_id] = {};
      }
      studentScoreMap[row.student_id][row.subject_id] = parseFloat(row.score);
    }

    // Chỉ giữ student có đủ 3 môn
    const validStudents = [];
    for (const [studentId, scoresBySubject] of Object.entries(studentScoreMap)) {
      if (subjectIds.every((id) => scoresBySubject[id] !== undefined)) {
        const total = subjectIds.reduce((sum, id) => sum + scoresBySubject[id], 0);
        const entry = { studentId: parseInt(studentId), total };
        subjectIds.forEach((id) => {
          entry[idToCode[id]] = scoresBySubject[id];
        });
        validStudents.push(entry);
      }
    }

    // Sắp xếp giảm dần theo total, lấy top 10
    validStudents.sort((a, b) => b.total - a.total);
    const top10Ids = validStudents.slice(0, 10).map((s) => s.studentId);

    // Lấy SBD
    const students = await Student.findAll({
      where: { id: { [Op.in]: top10Ids } },
      attributes: ['id', 'sbd'],
      raw: true,
    });
    const idToSbd = {};
    students.forEach((s) => { idToSbd[s.id] = s.sbd; });

    return validStudents.slice(0, 10).map((s) => ({
      sbd: idToSbd[s.studentId] || '???',
      toan: s.toan ?? null,
      vat_li: s.vat_li ?? null,
      hoa_hoc: s.hoa_hoc ?? null,
      total: parseFloat(s.total.toFixed(2)),
    }));
  }
}

module.exports = new ReportService();
