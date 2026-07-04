const EmptyState = ({ icon = '📭', text = 'Không có dữ liệu' }) => (
  <div className="empty-state">
    <div className="empty-state-icon">{icon}</div>
    <p className="empty-state-text">{text}</p>
  </div>
);

export default EmptyState;
