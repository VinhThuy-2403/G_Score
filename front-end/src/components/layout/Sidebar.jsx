import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: '🏠', exact: true },
  { to: '/search', label: 'Tra cứu điểm', icon: '🔍' },
  { to: '/reports', label: 'Báo cáo', icon: '📊' },
  { to: '/settings', label: 'Cài đặt', icon: '⚙️' },
];

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem('sidebar-collapsed') === 'true';
  });

  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', collapsed);
  }, [collapsed]);

  return (
    <>
      <aside className={`sidebar${collapsed ? ' collapsed' : ''}`}>

        {/* Header — khi mở: logo + tên + nút toggle; khi đóng: chỉ G icon căn giữa */}
        {collapsed ? (
          /* Collapsed header: G icon căn giữa, nút toggle bên dưới G */
          <div className="sidebar-header" style={{ flexDirection: 'column', gap: '6px', padding: '14px 0', alignItems: 'center', justifyContent: 'center' }}>
            <div className="sidebar-logo-icon" style={{ width: '32px', height: '32px', fontSize: '15px', fontWeight: 700 }}>G</div>
            <button
              className="sidebar-toggle"
              onClick={() => setCollapsed(false)}
              title="Mở rộng sidebar"
              style={{ fontSize: '12px', padding: '2px 6px' }}
            >
              »
            </button>
          </div>
        ) : (
          /* Expanded header: logo + tên + nút thu gọn */
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <div className="sidebar-logo-icon">G</div>
              <span>G-Scores</span>
            </div>
            <button
              className="sidebar-toggle"
              onClick={() => setCollapsed(true)}
              title="Thu gọn sidebar"
            >
              «
            </button>
          </div>
        )}

        {/* Nav */}
        <nav className="sidebar-nav">
          {NAV_ITEMS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.exact}
              className={({ isActive }) =>
                `sidebar-nav-item${isActive ? ' active' : ''}`
              }
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
              {collapsed && <span className="tooltip">{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Spacer để đẩy nội dung chính */}
      <div
        style={{
          flexShrink: 0,
          width: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
          transition: 'width 0.2s ease',
        }}
      />
    </>
  );
};

export default Sidebar;
