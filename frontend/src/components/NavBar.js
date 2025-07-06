import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
  const location = useLocation();
  const isAdmin = localStorage.getItem('isAdmin') === 'true';
  const [theme, setTheme] = React.useState(localStorage.getItem('theme') || 'light');
  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);
  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    localStorage.removeItem('token');
    window.location.href = '/';
  };
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  return (
    <nav className="navbar">
      <div className="navbar-content">
        <Link to="/" className="navbar-logo">
          <span role="img" aria-label="bengaluru">🏙️</span> FixBengaluru
        </Link>
        <div className="navbar-links">
          <Link to="/" className={location.pathname === '/' ? 'active' : ''}>Home</Link>
          <Link to="/report" className={location.pathname === '/report' ? 'active' : ''}>Report Issue</Link>
          {isAdmin && (
            <Link to="/issues" className={location.pathname === '/issues' ? 'active' : ''}>View Issues</Link>
          )}
          {!isAdmin && (
            <Link to="/admin/login" className={location.pathname === '/admin/login' ? 'active' : ''}>Admin Login</Link>
          )}
          {isAdmin && (
            <button onClick={handleLogout} className="logout-btn">Logout</button>
          )}
        </div>
        <button onClick={toggleTheme} className="theme-toggle" title="Toggle theme">
          {theme === 'light' ? '🌙' : '☀️'}
        </button>
      </div>
    </nav>
  );
}

export default NavBar; 