import Card from '../components/Card';

const SettingsPage = () => (
  <Card>
    <h2 className="card-title">Cài đặt</h2>
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '40px 0',
        gap: '12px',
        color: 'var(--text-secondary)',
      }}
    >
      <span style={{ fontSize: '32px', opacity: 0.3 }}>⚙️</span>
      <p style={{ margin: 0, fontSize: '14px' }}>Chức năng đang phát triển</p>
    </div>
  </Card>
);

export default SettingsPage;
