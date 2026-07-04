import { useState, useEffect, useCallback } from 'react';
import {
  getScoreLevelsBySubject,
  getAllScoreLevels,
  getTop10GroupA,
  getSubjects,
} from '../services/api';

export const useReport = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState('');
  const [scoreLevels, setScoreLevels] = useState(null);
  const [allScoreLevels, setAllScoreLevels] = useState([]);
  const [top10, setTop10] = useState([]);
  const [loading, setLoading] = useState(false);
  const [top10Loading, setTop10Loading] = useState(false);
  const [error, setError] = useState(null);

  // Load subjects list
  useEffect(() => {
    getSubjects()
      .then((res) => {
        setSubjects(res.data);
        if (res.data.length > 0) setSelectedSubject(res.data[0].code);
      })
      .catch(() => {});
  }, []);

  // Load score levels khi selectedSubject thay đổi
  const fetchScoreLevels = useCallback(async (subjectCode) => {
    if (!subjectCode) return;
    setLoading(true);
    setError(null);
    try {
      const res = await getScoreLevelsBySubject(subjectCode);
      setScoreLevels(res.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Lỗi tải dữ liệu');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (selectedSubject) fetchScoreLevels(selectedSubject);
  }, [selectedSubject, fetchScoreLevels]);

  // Load top 10
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
    allScoreLevels,
    top10,
    loading,
    top10Loading,
    error,
    fetchTop10,
  };
};
