import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api/v1',
  timeout: 30000,
});

// Tra cứu điểm theo SBD
export const getStudentScore = (sbd) => api.get(`/students/${sbd}`);

// Thống kê 4 mức điểm 1 môn
export const getScoreLevelsBySubject = (subject) =>
  api.get('/reports/score-levels', { params: { subject } });

// Thống kê 4 mức điểm tất cả môn
export const getAllScoreLevels = () => api.get('/reports/score-levels/all');

// Top 10 khối A
export const getTop10GroupA = () => api.get('/reports/top10-group-a');

// Danh sách môn học
export const getSubjects = () => api.get('/subjects');

// Tổng số thí sinh (dùng cho Dashboard)
export const getStudentCount = () => api.get('/reports/student-count');

export default api;
