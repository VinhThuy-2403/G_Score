// src/server.js
require('dotenv').config();
const app = require('./app');
const reportService = require('./services/report.service');
const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  // Khởi chạy tính toán trước dữ liệu đệm ngay khi server bật
  await reportService.initCache();
});