'use strict';

const subjects = [
  { code: 'toan',       name: 'Toán',       group_a: true,  createdAt: new Date(), updatedAt: new Date() },
  { code: 'ngu_van',    name: 'Ngữ văn',    group_a: false, createdAt: new Date(), updatedAt: new Date() },
  { code: 'vat_li',     name: 'Vật lí',     group_a: true,  createdAt: new Date(), updatedAt: new Date() },
  { code: 'hoa_hoc',    name: 'Hóa học',    group_a: true,  createdAt: new Date(), updatedAt: new Date() },
  { code: 'sinh_hoc',   name: 'Sinh học',   group_a: false, createdAt: new Date(), updatedAt: new Date() },
  { code: 'lich_su',    name: 'Lịch sử',    group_a: false, createdAt: new Date(), updatedAt: new Date() },
  { code: 'dia_li',     name: 'Địa lí',     group_a: false, createdAt: new Date(), updatedAt: new Date() },
  { code: 'gdcd',       name: 'GDCD',       group_a: false, createdAt: new Date(), updatedAt: new Date() },
  { code: 'ngoai_ngu',  name: 'Ngoại ngữ',  group_a: false, createdAt: new Date(), updatedAt: new Date() },
];

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert('subjects', subjects, {
      ignoreDuplicates: true,
    });
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('subjects', null, {});
  },
};
