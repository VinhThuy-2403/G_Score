import { useLocation } from 'react-router-dom';

const PAGE_TITLES = {
  '/': 'Dashboard',
  '/search': 'Tra cứu điểm',
  '/reports': 'Báo cáo',
  '/settings': 'Cài đặt',
};

const Header = ({ onMobileToggle }) => {
  const location = useLocation();

  const title =
    Object.entries(PAGE_TITLES).find(([path]) =>
      path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
    )?.[1] || 'G-Scores';

  return (
    <header className="header">
      {/* Nút Hamburger - chỉ hiển thị trên mobile */}
      <button
        className="hamburger-btn"
        onClick={() => onMobileToggle(true)}
        aria-label="Mở menu"
      >
        ☰
      </button>
      <h1 className="header-title" style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>
        {title}
      </h1>
    </header>
  );
};

export default Header;

