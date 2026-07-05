import { NavLink, useLocation } from 'react-router-dom';
import { useState, useEffect } from 'react';

const NAV_ITEMS = [
  { to: '/', label: 'Dashboard', icon: '🏠', exact: true },
  { to: '/search', label: 'Tra cứu điểm', icon: '🔍' },
  { to: '/reports', label: 'Báo cáo', icon: '📊' },
  { to: '/settings', label: 'Cài đặt', icon: '⚙️' },
];

const Sidebar = ({ onMobileToggle, mobileOpen }) => {
  const [collapsed, setCollapsed] = useState(() => {
    return localStorage.getItem('sidebar-collapsed') === 'true';
  });
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const location = useLocation();

  useEffect(() => {
    localStorage.setItem('sidebar-collapsed', collapsed);
  }, [collapsed]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Tự động đóng sidebar khi chuyển trang trên mobile
  useEffect(() => {
    if (isMobile && mobileOpen) {
      onMobileToggle(false);
    }
  }, [location.pathname]);

  const sidebarClass = [
    'sidebar',
    collapsed && !isMobile ? 'collapsed' : '',
    isMobile && mobileOpen ? 'mobile-open' : '',
  ].filter(Boolean).join(' ');

  return (
    <>
      {/* Overlay backdrop trên mobile */}
      {isMobile && mobileOpen && (
        <div className="sidebar-overlay" onClick={() => onMobileToggle(false)} />
      )}

      <aside className={sidebarClass}>
        {/* Header */}
        {(!isMobile && collapsed) ? (
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
          <div className="sidebar-header">
            <div className="sidebar-logo">
              <div className="sidebar-logo-icon">G</div>
              <span>G-Scores</span>
            </div>
            {!isMobile && (
              <button
                className="sidebar-toggle"
                onClick={() => setCollapsed(true)}
                title="Thu gọn sidebar"
              >
                «
              </button>
            )}
            {isMobile && (
              <button
                className="sidebar-toggle"
                onClick={() => onMobileToggle(false)}
                title="Đóng menu"
              >
                ✕
              </button>
            )}
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
              {!isMobile && collapsed && <span className="tooltip">{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>

      {/* Spacer — ẩn trên mobile vì sidebar dùng overlay */}
      {!isMobile && (
        <div
          style={{
            flexShrink: 0,
            width: collapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
            transition: 'width 0.2s ease',
          }}
        />
      )}
    </>
  );
};

export default Sidebar;
