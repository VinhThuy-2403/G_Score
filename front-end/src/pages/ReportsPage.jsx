import { useState, useEffect } from 'react';
import Card from '../components/Card';
import Tabs from '../components/Tabs';
import ScoreLevelChart from '../components/ScoreLevelChart';
import Top10Table from '../components/Top10Table';
import ErrorBanner from '../components/ErrorBanner';
import { useReport } from '../hooks/useReport';

const TABS = [
  { id: 'score-levels', label: 'Phổ điểm theo môn' },
  { id: 'top10', label: 'Top 10 khối A' },
];

const ReportsPage = () => {
  const [activeTab, setActiveTab] = useState('score-levels');
  const {
    subjects,
    selectedSubject,
    setSelectedSubject,
    scoreLevels,
    top10,
    loading,
    top10Loading,
    error,
    fetchTop10,
  } = useReport();

  // Tải top10 khi chuyển sang tab đó lần đầu
  useEffect(() => {
    if (activeTab === 'top10' && top10.length === 0) {
      fetchTop10();
    }
  }, [activeTab, top10.length, fetchTop10]);

  return (
    <div>
      <Card>
        <Tabs tabs={TABS} activeTab={activeTab} onTabChange={setActiveTab} />

        {/* Tab: Phổ điểm */}
        {activeTab === 'score-levels' && (
          <div>
            <div style={{ marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <label htmlFor="subject-select" style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-secondary)', whiteSpace: 'nowrap' }}>
                Chọn môn:
              </label>
              <select
                id="subject-select"
                className="select"
                value={selectedSubject}
                onChange={(e) => setSelectedSubject(e.target.value)}
              >
                {subjects.map((s) => (
                  <option key={s.code} value={s.code}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
            <ErrorBanner message={error} />
            <ScoreLevelChart data={scoreLevels} loading={loading} />
          </div>
        )}

        {/* Tab: Top 10 */}
        {activeTab === 'top10' && (
          <div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '13px', marginTop: 0, marginBottom: '20px' }}>
              10 thí sinh có tổng điểm Toán + Vật lí + Hóa học cao nhất (chỉ tính thí sinh có đủ điểm cả 3 môn).
            </p>
            <Top10Table data={top10} loading={top10Loading} />
          </div>
        )}
      </Card>
    </div>
  );
};

export default ReportsPage;
