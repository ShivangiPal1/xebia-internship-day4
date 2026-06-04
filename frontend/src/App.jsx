import React from 'react';
import { Link, Outlet, useNavigate } from 'react-router-dom';

const App = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="app-shell">
      <header className="topbar">
        <Link to={token ? '/dashboard' : '/login'} className="brand">
          InternshipHub
        </Link>
        <nav className="nav-actions">
          {token ? (
            <button type="button" className="ghost-button" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="primary-link">
                Register
              </Link>
            </>
          )}
        </nav>
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default App;
