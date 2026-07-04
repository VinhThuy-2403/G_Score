import { useState, useCallback } from 'react';
import { getStudentScore } from '../services/api';

// Bộ nhớ đệm toàn cục lưu kết quả tra cứu gần nhất
let lastSearchedData = null;
let lastSearchedError = null;

export const useStudentScore = () => {
  // Khởi tạo State bằng dữ liệu đã lưu trong cache
  const [data, setData] = useState(lastSearchedData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(lastSearchedError);

  const search = useCallback(async (sbd) => {
    if (!sbd || sbd.trim() === '') return;
    setLoading(true);
    setError(null);
    setData(null);
    
    // Đồng bộ xóa cache cũ khi bắt đầu tìm kiếm mới
    lastSearchedData = null;
    lastSearchedError = null;

    try {
      const res = await getStudentScore(sbd.trim());
      const studentData = res.data;
      
      setData(studentData);
      // Lưu kết quả thành công vào cache
      lastSearchedData = studentData;
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        'Không thể kết nối đến máy chủ. Vui lòng thử lại.';
      setError(msg);
      // Lưu thông báo lỗi vào cache
      lastSearchedError = msg;
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, search };
};
