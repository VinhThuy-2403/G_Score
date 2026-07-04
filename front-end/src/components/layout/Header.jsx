import { useLocation } from 'react-router-dom';

const PAGE_TITLES = {
  '/': 'Dashboard',
  '/search': 'Tra cứu điểm',
  '/reports': 'Báo cáo',
  '/settings': 'Cài đặt',
};

const Header = () => {
  const location = useLocation();

  const title =
    Object.entries(PAGE_TITLES).find(([path]) =>
      path === '/' ? location.pathname === '/' : location.pathname.startsWith(path)
    )?.[1] || 'G-Scores';

  return (
    <header className="header">
      <h1 className="header-title" style={{ margin: 0, fontSize: '16px', fontWeight: 600 }}>
        {title}
      </h1>
      <div className="header-avatar" title="User">
        <span>U</span>
      </div>
    </header>
  );
};

export default Header;
