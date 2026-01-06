import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { appointmentAPI, doctorAPI } from '../services/api';
import { Link } from 'react-router-dom';
import './Dashboard.css';

export const Dashboard = () => {
  const { user, isDoctor, isAdmin } = useAuth();
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    approvedAppointments: 0,
    totalDoctors: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        if (isAdmin) {
          const appointments = await appointmentAPI.getAll();
          const pending = appointments.filter((apt) => apt.status === 'PENDING').length;
          const approved = appointments.filter((apt) => apt.status === 'APPROVED').length;
          setStats({
            totalAppointments: appointments.length,
            pendingAppointments: pending,
            approvedAppointments: approved,
            totalDoctors: 0,
          });
        } else if (isDoctor) {
          const doctors = await doctorAPI.getAll();
          const doctor = doctors.find((d) => d.email === user.email);
          if (doctor) {
            const appointments = await appointmentAPI.getByDoctor(doctor.id);
            const pending = appointments.filter((apt) => apt.status === 'PENDING').length;
            const approved = appointments.filter((apt) => apt.status === 'APPROVED').length;
            setStats({
              totalAppointments: appointments.length,
              pendingAppointments: pending,
              approvedAppointments: approved,
              totalDoctors: 0,
            });
          }
        } else {
          const appointments = await appointmentAPI.getByUser(user.userId);
          const doctors = await doctorAPI.getAll();
          setStats({
            totalAppointments: appointments.length,
            pendingAppointments: appointments.filter((apt) => apt.status === 'PENDING').length,
            approvedAppointments: appointments.filter((apt) => apt.status === 'APPROVED').length,
            totalDoctors: doctors.length,
          });
        }
      } catch (error) {
        console.error('Error fetching stats:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchStats();
    }
  }, [user, isDoctor]);

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Welcome back, {user?.email}!</h1>
        <p className="page-subtitle">
          {isDoctor ? 'Manage your appointments and profile' : 'Book appointments and manage your health'}
        </p>
      </div>

      <div className="dashboard-stats-grid" style={{ marginBottom: '2rem' }}>
        <div className="stats-card">
          <div className="stats-card-header">
            <div className="stats-card-icon" style={{ backgroundColor: '#2563eb' }}>
              📅
            </div>
            <div className="stats-card-content">
              <div className="stats-card-label">Total Appointments</div>
              <div className="stats-card-value">{stats.totalAppointments}</div>
            </div>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-card-header">
            <div className="stats-card-icon" style={{ backgroundColor: '#eab308' }}>
              ⏳
            </div>
            <div className="stats-card-content">
              <div className="stats-card-label">Pending</div>
              <div className="stats-card-value">{stats.pendingAppointments}</div>
            </div>
          </div>
        </div>

        <div className="stats-card">
          <div className="stats-card-header">
            <div className="stats-card-icon" style={{ backgroundColor: '#10b981' }}>
              ✓
            </div>
            <div className="stats-card-content">
              <div className="stats-card-label">Approved</div>
              <div className="stats-card-value">{stats.approvedAppointments}</div>
            </div>
          </div>
        </div>

        {!isDoctor && (
          <div className="stats-card">
            <div className="stats-card-header">
              <div className="stats-card-icon" style={{ backgroundColor: '#3b82f6' }}>
                👨‍⚕️
              </div>
              <div className="stats-card-content">
                <div className="stats-card-label">Available Doctors</div>
                <div className="stats-card-value">{stats.totalDoctors}</div>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="card">
        <div className="card-header">
          <h2 className="card-title">Quick Actions</h2>
        </div>
        <div className="dashboard-actions">
          {!isDoctor && (
            <Link to="/doctors" className="quick-action-card">
              <h3>Find Doctors</h3>
              <p>Browse and book appointments</p>
            </Link>
          )}
          <Link to="/appointments" className="quick-action-card">
            <h3>My Appointments</h3>
            <p>View and manage appointments</p>
          </Link>
          {isDoctor && (
            <Link to="/doctor-profile" className="quick-action-card">
              <h3>Profile Settings</h3>
              <p>Update your profile</p>
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};