import EmptyState from './EmptyState';

const Top10Table = ({ data, loading }) => {
  if (loading) {
    return <EmptyState icon="⏳" text="Đang tải dữ liệu..." />;
  }

  if (!data || data.length === 0) {
    return <EmptyState icon="🏆" text="Chưa có dữ liệu Top 10 khối A." />;
  }

  return (
    <div className="table-wrapper">
      <table className="table">
        <thead>
          <tr>
            <th style={{ width: '48px' }}>#</th>
            <th>Số báo danh</th>
            <th>Toán</th>
            <th>Vật lí</th>
            <th>Hóa học</th>
            <th>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                Tổng điểm
                <span style={{ color: 'var(--text-secondary)', fontSize: '11px' }}>▼</span>
              </span>
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((student, index) => (
            <tr key={student.sbd} className={index === 0 ? 'rank-1' : ''}>
              <td>
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '24px',
                    height: '24px',
                    borderRadius: '50%',
                    background: index === 0 ? 'var(--text-primary)' : 'transparent',
                    color: index === 0 ? '#fff' : 'var(--text-secondary)',
                    fontSize: '12px',
                    fontWeight: 600,
                  }}
                >
                  {index + 1}
                </span>
              </td>
              <td style={{ fontWeight: 500, fontFamily: 'monospace', letterSpacing: '0.5px' }}>
                {student.sbd}
              </td>
              <td>{student.toan !== null ? Number(student.toan).toFixed(2) : '—'}</td>
              <td>{student.vat_li !== null ? Number(student.vat_li).toFixed(2) : '—'}</td>
              <td>{student.hoa_hoc !== null ? Number(student.hoa_hoc).toFixed(2) : '—'}</td>
              <td>
                <strong>{Number(student.total).toFixed(2)}</strong>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Top10Table;
