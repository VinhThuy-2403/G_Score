import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Card from '../components/Card';
import SearchForm from '../components/SearchForm';
import ScoreTable from '../components/ScoreTable';
import ErrorBanner from '../components/ErrorBanner';
import { useStudentScore } from '../hooks/useStudentScore';

const SearchScorePage = () => {
  const [searchParams] = useSearchParams();
  const { data, loading, error, search } = useStudentScore();

  // Nếu được redirect từ Dashboard với sbd param
  useEffect(() => {
    const sbd = searchParams.get('sbd');
    if (sbd) search(sbd);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      <Card>
        <h2 className="card-title">Tra cứu theo số báo danh</h2>
        <SearchForm onSearch={search} loading={loading} />
      </Card>

      <Card>
        <h2 className="card-title">Kết quả điểm thi</h2>
        <ErrorBanner message={error} />
        <ScoreTable data={data} />
      </Card>
    </div>
  );
};

export default SearchScorePage;
