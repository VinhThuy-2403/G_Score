'use strict';

const { Subject, Student, sequelize } = require('../models');
const { Op, QueryTypes } = require('sequelize');

class ReportService {
  constructor() {
    // Khởi tạo bộ lưu trữ đệm (RAM Cache) của Node.js
    this.cache = {
      scoreLevels: {}, // { toan: {...}, ngu_van: {...} }
      top10: null,     // [ Thí sinh 1, Thí sinh 2... ]
    };
  }

  /**
   * Tính toán sẵn toàn bộ dữ liệu báo cáo (Chạy lúc khởi động server)
   */
  async initCache() {
    try {
      console.log('[Cache] Đang tính toán trước dữ liệu báo cáo để nạp vào RAM...');
      const subjects = await Subject.findAll({ order: [['id', 'ASC']] });
      
      if (subjects.length === 0) {
        console.log('[Cache] Database trống (chưa seed). Bỏ qua tính toán trước.');
        return;
      }

      // Tính phổ điểm song song cho tất cả các môn
      await Promise.all(
        subjects.map(async (s) => {
          const data = await this.calculateScoreLevels(s.code);
          if (data) this.cache.scoreLevels[s.code] = data;
        })
      );

      // Tính bảng xếp hạng Top 10
      this.cache.top10 = await this.calculateTop10GroupA();
      console.log('[Cache] Nạp dữ liệu báo cáo vào RAM thành công! Sẵn sàng phục vụ 0ms.');
    } catch (err) {
      console.warn('[Cache Warning] Không thể tính toán trước dữ liệu (DB có thể chưa được setup):', err.message);
    }
  }

  /**
   * LOGIC TÍNH TOÁN PHỔ ĐIỂM (Truy vấn thực tế dưới DB)
   */
  async calculateScoreLevels(subjectCode) {
    const subject = await Subject.findOne({ where: { code: subjectCode } });
    if (!subject) return null;

    const [result] = await sequelize.query(
      `SELECT
        SUM(CASE WHEN score >= 8 THEN 1 ELSE 0 END)                    AS gte8,
        SUM(CASE WHEN score >= 6 AND score < 8 THEN 1 ELSE 0 END)      AS from6to8,
        SUM(CASE WHEN score >= 4 AND score < 6 THEN 1 ELSE 0 END)      AS from4to6,
        SUM(CASE WHEN score < 4 THEN 1 ELSE 0 END)                     AS lt4
      FROM scores FORCE INDEX (idx_scores_subject_score)
      WHERE subject_id = :subjectId AND score IS NOT NULL`,
      {
        replacements: { subjectId: subject.id },
        type: QueryTypes.SELECT,
      }
    );

    return {
      subject: subject.code,
      subjectName: subject.name,
      levels: {
        gte8:      parseInt(result.gte8)     || 0,
        from6to8:  parseInt(result.from6to8) || 0,
        from4to6:  parseInt(result.from4to6) || 0,
        lt4:       parseInt(result.lt4)      || 0,
      },
    };
  }

  /**
   * LẤY PHỔ ĐIỂM 1 MÔN (Kiểm tra cache trước, nếu không có mới tính và lưu)
   */
  async getScoreLevels(subjectCode) {
    // Nếu có trong cache -> lấy luôn
    if (this.cache.scoreLevels[subjectCode]) {
      return this.cache.scoreLevels[subjectCode];
    }
    
    // Nếu chưa có (Ví dụ: DB vừa được nạp mới) -> tính và lưu vào cache
    const data = await this.calculateScoreLevels(subjectCode);
    if (data) this.cache.scoreLevels[subjectCode] = data;
    return data;
  }

  /**
   * Lấy toàn bộ phổ điểm các môn
   */
  async getAllScoreLevels() {
    const subjects = await Subject.findAll({ order: [['id', 'ASC']] });
    const results = await Promise.all(
      subjects.map((s) => this.getScoreLevels(s.code))
    );
    return results.filter(Boolean);
  }

  /**
   * LOGIC TÍNH BẢNG XẾP HẠNG TOP 10 KHỐI A (Truy vấn thực tế dưới DB)
   */
  async calculateTop10GroupA() {
    const groupASubjects = await Subject.findAll({
      where: { group_a: true },
      attributes: ['id', 'code', 'name'],
      raw: true,
    });

    if (groupASubjects.length < 3) return [];

    const subjectIds = groupASubjects.map((s) => s.id);
    const idToCode = {};
    groupASubjects.forEach((s) => { idToCode[s.id] = s.code; });

    const toanId = subjectIds.find(id => idToCode[id] === 'toan');
    const vatLiId = subjectIds.find(id => idToCode[id] === 'vat_li');
    const hoaHocId = subjectIds.find(id => idToCode[id] === 'hoa_hoc');

    if (!toanId || !vatLiId || !hoaHocId) return [];

    const rows = await sequelize.query(
      `SELECT
        st.sbd,
        top.toan,
        top.vat_li,
        top.hoa_hoc,
        top.total
      FROM (
        SELECT
          sc1.student_id,
          sc1.score AS toan,
          sc2.score AS vat_li,
          sc3.score AS hoa_hoc,
          (sc1.score + sc2.score + sc3.score) AS total
        FROM scores sc1 FORCE INDEX (idx_scores_subject_score)
        INNER JOIN scores sc2 ON sc2.student_id = sc1.student_id AND sc2.subject_id = :vatLiId AND sc2.score >= 9.0
        INNER JOIN scores sc3 ON sc3.student_id = sc1.student_id AND sc3.subject_id = :hoaHocId AND sc3.score >= 9.0
        WHERE sc1.subject_id = :toanId AND sc1.score >= 9.0
        ORDER BY total DESC
        LIMIT 10
      ) top
      INNER JOIN students st ON st.id = top.student_id`,
      {
        replacements: { toanId, vatLiId, hoaHocId },
        type: QueryTypes.SELECT,
      }
    );

    return rows.map((r) => ({
      sbd: r.sbd,
      toan: r.toan !== null ? parseFloat(r.toan) : null,
      vat_li: r.vat_li !== null ? parseFloat(r.vat_li) : null,
      hoa_hoc: r.hoa_hoc !== null ? parseFloat(r.hoa_hoc) : null,
      total: parseFloat(parseFloat(r.total).toFixed(2)),
    }));
  }

  /**
   * LẤY TOP 10 KHỐI A (Kiểm tra cache trước)
   */
  async getTop10GroupA() {
    if (this.cache.top10) {
      return this.cache.top10;
    }
    
    const data = await this.calculateTop10GroupA();
    if (data && data.length > 0) this.cache.top10 = data;
    return data;
  }

  /**
   * Reset cache (Dùng khi bạn muốn tính lại dữ liệu mới)
   */
  clearCache() {
    this.cache.scoreLevels = {};
    this.cache.top10 = null;
    console.log('[Cache] Đã xóa toàn bộ bộ nhớ đệm của Backend!');
  }
}

module.exports = new ReportService();
