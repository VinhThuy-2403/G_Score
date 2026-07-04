import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Card from '../components/Card';
import SearchForm from '../components/SearchForm';
import { getStudentCount, getSubjects } from '../services/api';

const DashboardPage = () => {
  const navigate = useNavigate();
  const [studentCount, setStudentCount] = useState(null);
  const [subjectCount, setSubjectCount] = useState(null);

  useEffect(() => {
    getStudentCount().then((res) => setStudentCount(res.data.count)).catch(() => {});
    getSubjects().then((res) => setSubjectCount(res.data.length)).catch(() => {});
  }, []);

  const handleSearch = (sbd) => {
    navigate(`/search?sbd=${sbd}`);
  };

  return (
    <div>
      <p style={{ color: 'var(--text-secondary)', marginTop: 0, marginBottom: '24px', fontSize: '14px' }}>
        Hệ thống tra cứu &amp; thống kê điểm thi THPT 2024
      </p>

      {/* Stat cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px', marginBottom: '20px' }}>
        <Card className="stat-card">
          <div className="stat-value">
            {studentCount !== null ? studentCount.toLocaleString('vi-VN') : '—'}
          </div>
          <div className="stat-label">Tổng số thí sinh</div>
        </Card>
        <Card className="stat-card">
          <div className="stat-value">{subjectCount !== null ? subjectCount : '—'}</div>
          <div className="stat-label">Tổng số môn thi</div>
        </Card>
      </div>

      {/* Quick search */}
      <Card style={{ marginBottom: '16px' }}>
        <h2 className="card-title">Tra cứu nhanh</h2>
        <SearchForm onSearch={handleSearch} />
      </Card>

      {/* CTA to Reports */}
      <Card
        style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
        onClick={() => navigate('/reports')}
      >
        <div>
          <h2 className="card-title" style={{ marginBottom: '4px' }}>Xem báo cáo chi tiết →</h2>
          <p style={{ color: 'var(--text-secondary)', margin: 0, fontSize: '13px' }}>
            Phổ điểm theo môn &amp; Top 10 thí sinh khối A
          </p>
        </div>
        <span style={{ fontSize: '24px', opacity: 0.3 }}>📊</span>
      </Card>
    </div>
  );
};

export default DashboardPage;
