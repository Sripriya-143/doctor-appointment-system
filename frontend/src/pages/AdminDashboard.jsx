import { useEffect, useState } from 'react';
import { appointmentAPI, doctorAPI, userAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import './AdminDashboard.css';

export const AdminDashboard = () => {
  const { user } = useAuth();
  const [stats, setStats] = useState({
    totalAppointments: 0,
    pendingAppointments: 0,
    approvedAppointments: 0,
    rejectedAppointments: 0,
    totalDoctors: 0,
    totalUsers: 0,
  });
  const [loading, setLoading] = useState(true);
  const [recentAppointments, setRecentAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const appointments = await appointmentAPI.getAll();
        const doctors = await doctorAPI.getAll();

        const pending = appointments.filter((apt) => apt.status === 'PENDING').length;
        const approved = appointments.filter((apt) => apt.status === 'APPROVED').length;
        const rejected = appointments.filter((apt) => apt.status === 'REJECTED').length;

        // Get recent appointments (last 5)
        const recent = appointments
          .sort((a, b) => new Date(b.appointmentDate) - new Date(a.appointmentDate))
          .slice(0, 5);

        setRecentAppointments(recent);
        setStats({
          totalAppointments: appointments.length,
          pendingAppointments: pending,
          approvedAppointments: approved,
          rejectedAppointments: rejected,
          totalDoctors: doctors.length,
          totalUsers: 0, // We'll calculate this if needed
        });
      } catch (error) {
        console.error('Error fetching admin data:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchData();
    }
  }, [user]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  const getStatusBadge = (status) => {
    let badgeClass = 'badge';
    if (status === 'PENDING') badgeClass += ' badge-pending';
    else if (status === 'APPROVED') badgeClass += ' badge-approved';
    else if (status === 'REJECTED') badgeClass += ' badge-rejected';

    return <span className={badgeClass}>{status}</span>;
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading">Loading admin dashboard...</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Admin Dashboard</h1>
        <p className="page-subtitle">Manage all appointments, users, and system settings</p>
      </div>

      <div className="admin-stats-grid">
        <div className="stats-card admin-stat-card">
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

        <div className="stats-card admin-stat-card">
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

        <div className="stats-card admin-stat-card">
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

        <div className="stats-card admin-stat-card">
          <div className="stats-card-header">
            <div className="stats-card-icon" style={{ backgroundColor: '#ef4444' }}>
              ✗
            </div>
            <div className="stats-card-content">
              <div className="stats-card-label">Rejected</div>
              <div className="stats-card-value">{stats.rejectedAppointments}</div>
            </div>
          </div>
        </div>

        <div className="stats-card admin-stat-card">
          <div className="stats-card-header">
            <div className="stats-card-icon" style={{ backgroundColor: '#3b82f6' }}>
              👨‍⚕️
            </div>
            <div className="stats-card-content">
              <div className="stats-card-label">Total Doctors</div>
              <div className="stats-card-value">{stats.totalDoctors}</div>
            </div>
          </div>
        </div>
      </div>

      <div className="admin-actions-grid">
        <Link to="/appointments" className="admin-action-card">
          <div className="admin-action-icon">📋</div>
          <h3>Manage Appointments</h3>
          <p>Approve, reject, or delete all appointments</p>
        </Link>

        <Link to="/admin/doctors" className="admin-action-card">
          <div className="admin-action-icon">👨‍⚕️</div>
          <h3>Manage Doctors</h3>
          <p>Add, view, and remove doctors from the system</p>
        </Link>

        <Link to="/admin/users" className="admin-action-card">
          <div className="admin-action-icon">👥</div>
          <h3>Manage Users</h3>
          <p>View and manage all patients and users</p>
        </Link>

        <div className="admin-action-card disabled">
          <div className="admin-action-icon">⚙️</div>
          <h3>System Settings</h3>
          <p>Configure system settings (Coming soon)</p>
        </div>
      </div>

      {recentAppointments.length > 0 && (
        <div className="card">
          <h2 className="card-title">Recent Appointments</h2>
          <div className="recent-appointments">
            {recentAppointments.map((appointment) => (
              <div key={appointment.id} className="recent-appointment-item">
                <div className="recent-appointment-info">
                  <div className="recent-appointment-patient">
                    <strong>{appointment.user?.name || 'Unknown'}</strong>
                    <span> → </span>
                    <strong>{appointment.doctor?.name || 'Unknown'}</strong>
                  </div>
                  <div className="recent-appointment-date">
                    {formatDate(appointment.appointmentDate)} at {formatTime(appointment.appointmentTime)}
                  </div>
                </div>
                <div className="recent-appointment-status">
                  {getStatusBadge(appointment.status)}
                </div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '1rem', textAlign: 'center' }}>
            <Link to="/appointments" className="btn btn-primary">
              View All Appointments
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};