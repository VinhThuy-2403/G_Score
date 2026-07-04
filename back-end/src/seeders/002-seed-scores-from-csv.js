'use strict';

const fs = require('fs');
const path = require('path');
const { parse } = require('csv-parse');

// Map từ tên cột trong CSV → subject.code trong DB
const CSV_COL_TO_SUBJECT = {
  toan: 'toan',
  ngu_van: 'ngu_van',
  vat_li: 'vat_li',
  hoa_hoc: 'hoa_hoc',
  sinh_hoc: 'sinh_hoc',
  lich_su: 'lich_su',
  dia_li: 'dia_li',
  gdcd: 'gdcd',
  ngoai_ngu: 'ngoai_ngu',
};

const BATCH_SIZE = 500;
const CSV_PATH = path.resolve(__dirname, '../../dataset/diem_thi_thpt_2024.csv');

async function processBatch(queryInterface, subjectMap, batch) {
  const now = new Date();

  // Bulk insert students (ignore duplicates)
  await queryInterface.bulkInsert(
    'students',
    batch.map((row) => ({
      sbd: row.sbd,
      ma_ngoai_ngu: row.ma_ngoai_ngu || null,
      createdAt: now,
      updatedAt: now,
    })),
    { ignoreDuplicates: true }
  );

  // Lấy student IDs vừa insert (hoặc đã tồn tại)
  const sbdList = batch.map((r) => r.sbd);
  const inserted = await queryInterface.sequelize.query(
    `SELECT id, sbd FROM students WHERE sbd IN (${sbdList.map(() => '?').join(',')})`,
    {
      replacements: sbdList,
      type: queryInterface.sequelize.QueryTypes.SELECT,
    }
  );
  const sbdToId = {};
  inserted.forEach((s) => { sbdToId[s.sbd] = s.id; });

  // Chuẩn bị score rows
  const scoreRows = [];
  for (const row of batch) {
    const studentId = sbdToId[row.sbd];
    if (!studentId) continue;
    for (const [col, subjectCode] of Object.entries(CSV_COL_TO_SUBJECT)) {
      const rawVal = row[col];
      if (rawVal === undefined) continue;
      const scoreVal = rawVal === '' || rawVal === null ? null : parseFloat(rawVal);
      if (scoreVal !== null && isNaN(scoreVal)) continue;
      const subjectId = subjectMap[subjectCode];
      if (!subjectId) continue;
      scoreRows.push({
        student_id: studentId,
        subject_id: subjectId,
        score: scoreVal,
        createdAt: now,
        updatedAt: now,
      });
    }
  }

  if (scoreRows.length > 0) {
    await queryInterface.bulkInsert('scores', scoreRows, {
      ignoreDuplicates: true,
    });
  }
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    // Lấy danh sách subjects từ DB
    const subjectRows = await queryInterface.sequelize.query(
      'SELECT id, code FROM subjects',
      { type: queryInterface.sequelize.QueryTypes.SELECT }
    );
    const subjectMap = {};
    subjectRows.forEach((s) => { subjectMap[s.code] = s.id; });

    // Đọc toàn bộ file CSV vào memory theo chunk, không dùng pause/resume
    return new Promise((resolve, reject) => {
      const allRecords = [];
      let totalInserted = 0;

      const parser = parse({
        columns: true,
        skip_empty_lines: true,
        trim: true,
        bom: true,
      });

      parser.on('readable', function () {
        let record;
        while ((record = this.read()) !== null) {
          allRecords.push(record);
        }
      });

      parser.on('error', (err) => {
        console.error('[Seeder] Lỗi parse CSV:', err.message);
        reject(err);
      });

      parser.on('end', async () => {
        console.log(`[Seeder] Đọc xong CSV: ${allRecords.length} dòng. Bắt đầu insert...`);

        try {
          for (let i = 0; i < allRecords.length; i += BATCH_SIZE) {
            const batch = allRecords.slice(i, i + BATCH_SIZE);
            await processBatch(queryInterface, subjectMap, batch);
            totalInserted += batch.length;
            if (totalInserted % 10000 === 0) {
              console.log(`[Seeder] Đã xử lý ${totalInserted} / ${allRecords.length} thí sinh...`);
            }
          }
          console.log(`[Seeder] Hoàn thành! Tổng: ${totalInserted} thí sinh.`);
          resolve();
        } catch (err) {
          console.error('[Seeder] Lỗi insert:', err.message);
          reject(err);
        }
      });

      // Đọc file vào buffer trước để tránh EBUSY trên Windows
      try {
        const fileBuffer = fs.readFileSync(CSV_PATH);
        parser.write(fileBuffer);
        parser.end();
      } catch (err) {
        reject(err);
      }
    });
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('scores', null, {});
    await queryInterface.bulkDelete('students', null, {});
  },
};
