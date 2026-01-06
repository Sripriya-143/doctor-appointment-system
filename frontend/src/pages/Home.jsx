import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Home.css';

export const Home = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-container">
      <div className="home-content">
        <div className="home-hero">
          <h1 className="home-title">
            <span className="home-title-primary">MedAppoint</span>
          </h1>
          <p className="home-subtitle">
            Your trusted platform for booking doctor appointments. Fast, easy, and reliable healthcare scheduling.
          </p>
          <div className="home-actions">
            {!isAuthenticated ? (
              <>
                <Link to="/register" className="btn btn-primary btn-large">
                  Get Started
                </Link>
                <Link to="/login" className="btn btn-outline btn-large">
                  Sign In
                </Link>
              </>
            ) : (
              <Link to="/dashboard" className="btn btn-primary btn-large">
                Go to Dashboard
              </Link>
            )}
          </div>
        </div>

        <div className="home-features">
          <div className="feature-card">
            <div className="feature-icon">👨‍⚕️</div>
            <h3 className="feature-title">Find Doctors</h3>
            <p className="feature-description">
              Browse through our qualified doctors and find the perfect match for your needs.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📅</div>
            <h3 className="feature-title">Book Appointments</h3>
            <p className="feature-description">
              Schedule your appointments easily with our simple booking system.
            </p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3 className="feature-title">Manage Health</h3>
            <p className="feature-description">
              Keep track of all your appointments and manage your healthcare schedule.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};