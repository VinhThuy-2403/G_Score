import { useState, useCallback } from 'react';
import { getStudentScore } from '../services/api';

export const useStudentScore = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const search = useCallback(async (sbd) => {
    if (!sbd || sbd.trim() === '') return;
    setLoading(true);
    setError(null);
    setData(null);
    try {
      const res = await getStudentScore(sbd.trim());
      setData(res.data);
    } catch (err) {
      const msg =
        err.response?.data?.message ||
        'Không thể kết nối đến máy chủ. Vui lòng thử lại.';
      setError(msg);
    } finally {
      setLoading(false);
    }
  }, []);

  return { data, loading, error, search };
};
