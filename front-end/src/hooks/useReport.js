import { useState, useEffect, useCallback } from 'react';
import {
  getScoreLevelsBySubject,
  getTop10GroupA,
  getSubjects,
} from '../services/api';

// 1. Bộ nhớ đệm toàn cục lưu phổ điểm các môn học
const globalScoreLevelsCache = {};

// 2. Bộ nhớ đệm toàn cục lưu bảng xếp hạng Top 10 khối A
let globalTop10Cache = null;

export const useReport = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [scoreLevels, setScoreLevels] = useState(null);
  const [top10, setTop10] = useState([]);
  const [loading, setLoading] = useState(false);
  const [top10Loading, setTop10Loading] = useState(false);
  const [error, setError] = useState(null);

  // Tải danh sách môn học một lần duy nhất khi vào trang
  useEffect(() => {
    getSubjects()
      .then((res) => {
        setSubjects(res.data);
        if (res.data.length > 0) setSelectedSubject(res.data[0].code);
      })
      .catch(() => {});
  }, []);

  // Tải phổ điểm môn học (sử dụng bộ nhớ đệm toàn cục)
  const fetchScoreLevels = useCallback(async (subjectCode) => {
    if (!subjectCode) return;

    if (globalScoreLevelsCache[subjectCode]) {
      setScoreLevels(globalScoreLevelsCache[subjectCode]);
      setError(null);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await getScoreLevelsBySubject(subjectCode);
      const data = res.data;
      
      setScoreLevels(data);
      globalScoreLevelsCache[subjectCode] = data;
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedSubject) fetchScoreLevels(selectedSubject);
  }, [selectedSubject, fetchScoreLevels]);

  // Tải bảng xếp hạng Top 10 (sử dụng bộ nhớ đệm toàn cục)
  const fetchTop10 = useCallback(async () => {
    // Nếu đã có trong cache -> Lấy ra hiển thị luôn
    if (globalTop10Cache) {
      setTop10(globalTop10Cache);
      return;
    }

    setTop10Loading(true);
    try {
      const res = await getTop10GroupA();
      setTop10(res.data);
      // Lưu vào cache toàn cục
      globalTop10Cache = res.data;
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
