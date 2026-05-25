import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const navItems = [
  { label: 'My Dashboard', path: '/talent/dashboard', icon: '▦' },
  { label: 'My Tasks', path: '/talent/tasks', icon: '✓' },
];

const TalentSidebar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="talent-sidebar">
      <div className="sidebar-brand">
        <div className="brand-icon">
          <svg viewBox="0 0 40 40" fill="none">
            <rect width="40" height="40" rx="10" fill="url(#ts-grad)" />
            <path d="M12 20L18 26L28 14" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            <defs>
              <linearGradient id="ts-grad" x1="0" y1="0" x2="40" y2="40">
                <stop stopColor="#10b981" />
                <stop offset="1" stopColor="#059669" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <span className="brand-name">TaskPipeline</span>
      </div>

      <nav style={{ flex: 1 }}>
        <p className="nav-section-label">Menu</p>
        {navItems.map((item) => (
          <button
            key={item.path}
            className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => navigate(item.path)}
          >
            <span className="nav-icon">{item.icon}</span>
            <span>{item.label}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-footer">
        <div className="user-chip">
          <div className="user-avatar">{user?.name?.[0] ?? 'T'}</div>
          <div className="user-info">
            {/* Intentional gap: no title attribute on truncated name — no tooltip for full name */}
            <p className="user-name">{user?.name}</p>
            <p className="user-role">Talent</p>
          </div>
        </div>
        <button className="logout-btn" onClick={handleLogout} title="Logout">⏻</button>
      </div>
    </aside>
  );
};

export default TalentSidebar;
