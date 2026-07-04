import { useState, useEffect, useCallback } from 'react';
import {
  getScoreLevelsBySubject,
  getTop10GroupA,
  getSubjects,
} from '../services/api';

export const useReport = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [scoreLevels, setScoreLevels] = useState(null);
  const [top10, setTop10] = useState([]);
  const [loading, setLoading] = useState(false);
  const [top10Loading, setTop10Loading] = useState(false);
  const [error, setError] = useState(null);

  // Bộ nhớ đệm (cache) lưu phổ điểm các môn học trên giao diện
  const [cachedLevels, setCachedLevels] = useState({});

  // Tải danh sách môn học một lần duy nhất khi vào trang
  useEffect(() => {
    getSubjects()
      .then((res) => {
        setSubjects(res.data);
        if (res.data.length > 0) setSelectedSubject(res.data[0].code);
      })
      .catch(() => {});
  }, []);

  // Tải phổ điểm môn học (có kiểm tra bộ nhớ đệm cache)
  const fetchScoreLevels = useCallback(async (subjectCode) => {
    if (!subjectCode) return;

    // 1. Nếu môn học này đã có sẵn trong bộ nhớ đệm UI cache -> lấy ra dùng luôn
    if (cachedLevels[subjectCode]) {
      setScoreLevels(cachedLevels[subjectCode]);
      setError(null);
      return;
    }

    // 2. Nếu chưa có -> hiển thị trạng thái loading và gọi API lên backend
    setLoading(true);
    setError(null);
    try {
      const res = await getScoreLevelsBySubject(subjectCode);
      const data = res.data;
      
      // Hiển thị dữ liệu môn học
      setScoreLevels(data);
      
      // Lưu lại vào bộ nhớ đệm cache cho những lần chọn sau
      setCachedLevels((prev) => ({
        ...prev,
        [subjectCode]: data,
      }));
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  }, [cachedLevels]);

  useEffect(() => {
    if (selectedSubject) fetchScoreLevels(selectedSubject);
  }, [selectedSubject, fetchScoreLevels]);

  // Tải bảng xếp hạng Top 10 (chỉ gọi 1 lần khi người dùng bấm sang tab Top 10)
  const fetchTop10 = useCallback(async () => {
    setTop10Loading(true);
    try {
      const res = await getTop10GroupA();
      setTop10(res.data);
    } catch {
      setTop10([]);
    } finally {
      setTop10Loading(false);
    }
  }, []);

  return {
    subjects,
    selectedSubject,
    setSelectedSubject,
    scoreLevels,
    top10,
    loading,
    top10Loading,
    error,
    fetchTop10,
  };
};
