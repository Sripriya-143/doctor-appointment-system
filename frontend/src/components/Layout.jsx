import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Layout.css';

export const Layout = ({ children }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="app-container">
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-left">
            <Link to="/" className="navbar-brand">
              MedAppoint
            </Link>
            {isAuthenticated && (
              <div className="navbar-links">
                <Link to="/dashboard" className="navbar-link">
                  Dashboard
                </Link>
                {user?.role === 'USER' && (
                  <>
                    <Link to="/doctors" className="navbar-link">
                      Find Doctors
                    </Link>
                    <Link to="/appointments" className="navbar-link">
                      My Appointments
                    </Link>
                  </>
                )}
                {user?.role === 'DOCTOR' && (
                  <>
                    <Link to="/appointments" className="navbar-link">
                      Appointments
                    </Link>
                    <Link to="/doctor-profile" className="navbar-link">
                      Profile
                    </Link>
                  </>
                )}
                {user?.role === 'ADMIN' && (
                  <>
                    <Link to="/admin" className="navbar-link">
                      Admin Dashboard
                    </Link>
                    <Link to="/appointments" className="navbar-link">
                      Manage Appointments
                    </Link>
                    <Link to="/admin/doctors" className="navbar-link">
                      Manage Doctors
                    </Link>
                    <Link to="/admin/users" className="navbar-link">
                      Manage Users
                    </Link>
                  </>
                )}
              </div>
            )}
          </div>
          <div className="navbar-right">
            {isAuthenticated ? (
              <div className="navbar-user">
                <span className="navbar-user-text">
                  Welcome, <span className="navbar-user-name">{user?.email}</span>
                </span>
                <button onClick={handleLogout} className="btn btn-danger">
                  Logout
                </button>
              </div>
            ) : (
              <div className="navbar-user">
                <Link to="/login" className="navbar-link">
                  Login
                </Link>
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      </nav>
      <main>{children}</main>
    </div>
  );
};