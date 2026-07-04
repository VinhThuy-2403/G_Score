import EmptyState from './EmptyState';

const SUBJECT_DISPLAY = {
  toan: 'Toán',
  ngu_van: 'Ngữ văn',
  vat_li: 'Vật lí',
  hoa_hoc: 'Hóa học',
  sinh_hoc: 'Sinh học',
  lich_su: 'Lịch sử',
  dia_li: 'Địa lí',
  gdcd: 'GDCD',
  ngoai_ngu: 'Ngoại ngữ',
};

const ScoreTable = ({ data }) => {
  if (!data) {
    return (
      <EmptyState
        icon="📋"
        text="Nhập số báo danh để xem điểm chi tiết."
      />
    );
  }

  const { sbd, scores } = data;

  return (
    <div>
      <p style={{ fontSize: '13px', color: 'var(--text-secondary)', marginTop: 0, marginBottom: '16px' }}>
        Số báo danh: <strong style={{ color: 'var(--text-primary)' }}>{sbd}</strong>
      </p>
      <div className="table-wrapper">
        <table className="table">
          <thead>
            <tr>
              <th>Môn thi</th>
              <th>Điểm</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((s) => (
              <tr key={s.subject}>
                <td>{s.subjectName || SUBJECT_DISPLAY[s.subject] || s.subject}</td>
                <td>
                  {s.score !== null ? (
                    <span style={{ fontWeight: 500 }}>{Number(s.score).toFixed(2)}</span>
                  ) : (
                    <span style={{ color: 'var(--text-secondary)' }}>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScoreTable;
