import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { appointmentAPI, doctorAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './Appointments.css';

export const Appointments = () => {
  const { user, isDoctor, isAdmin } = useAuth();
  const [doctorId, setDoctorId] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(location.state?.message || '');

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        let data;
        if (isAdmin) {
          // Admin sees all appointments
          data = await appointmentAPI.getAll();
        } else if (isDoctor) {
          // Doctor sees only their appointments
          // First, find the doctor by email
          const doctors = await doctorAPI.getAll();
          const doctor = doctors.find((d) => d.email === user.email);
          if (doctor) {
            setDoctorId(doctor.id);
            data = await appointmentAPI.getByDoctor(doctor.id);
          } else {
            data = [];
          }
        } else {
          // Patient sees only their appointments
          data = await appointmentAPI.getByUser(user.userId);
        }
        setAppointments(data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchAppointments();
    }

    // Clear message after 5 seconds
    if (message) {
      const timer = setTimeout(() => setMessage(''), 5000);
      return () => clearTimeout(timer);
    }
  }, [user, isDoctor, isAdmin, message]);

  const refreshAppointments = async () => {
    let data;
    if (isAdmin) {
      data = await appointmentAPI.getAll();
    } else if (isDoctor && doctorId) {
      data = await appointmentAPI.getByDoctor(doctorId);
    } else {
      data = await appointmentAPI.getByUser(user.userId);
    }
    setAppointments(data);
  };

  const handleApprove = async (id) => {
    try {
      await appointmentAPI.approve(id);
      await refreshAppointments();
      setMessage('Appointment approved successfully!');
    } catch (error) {
      console.error('Error approving appointment:', error);
      alert('Failed to approve appointment');
    }
  };

  const handleReject = async (id) => {
    if (!window.confirm('Are you sure you want to reject this appointment?')) {
      return;
    }
    try {
      await appointmentAPI.reject(id);
      await refreshAppointments();
      setMessage('Appointment rejected');
    } catch (error) {
      console.error('Error rejecting appointment:', error);
      alert('Failed to reject appointment');
    }
  };

  const handleDelete = async (id) => {
    const statusText = isAdmin || isDoctor ? 'delete' : 'cancel';
    if (!window.confirm(`Are you sure you want to ${statusText} this appointment?`)) {
      return;
    }
    try {
      await appointmentAPI.delete(id);
      await refreshAppointments();
      setMessage(`Appointment ${statusText}ed successfully!`);
    } catch (error) {
      console.error('Error deleting appointment:', error);
      alert(`Failed to ${statusText} appointment`);
    }
  };

  const getStatusBadge = (status) => {
    let badgeClass = 'badge';
    if (status === 'PENDING') badgeClass += ' badge-pending';
    else if (status === 'APPROVED') badgeClass += ' badge-approved';
    else if (status === 'REJECTED') badgeClass += ' badge-rejected';

    return <span className={badgeClass}>{status}</span>;
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const displayHour = hour % 12 || 12;
    return `${displayHour}:${minutes} ${ampm}`;
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading">Loading appointments...</div>
      </div>
    );
  }

  return (
    <div className="page-container">
        <div className="page-header">
          <h1 className="page-title">
            {isAdmin ? 'Manage All Appointments' : isDoctor ? 'All Appointments' : 'My Appointments'}
          </h1>
          <p className="page-subtitle">
            {isAdmin
              ? 'Admin panel: Approve, reject, or delete any appointment'
              : isDoctor
              ? 'Manage and review appointment requests'
              : 'View and manage your booked appointments'}
          </p>
        </div>

      {message && (
        <div className="alert alert-success">
          {message}
        </div>
      )}

      {!isAdmin && !isDoctor && appointments.length === 0 && (
        <div className="empty-state">
          <p className="empty-state-text">You don't have any appointments yet.</p>
          <button
            onClick={() => navigate('/doctors')}
            className="btn btn-primary"
          >
            Find Doctors
          </button>
        </div>
      )}

      {(isAdmin || isDoctor) && appointments.length === 0 && (
        <div className="empty-state">
          <p className="empty-state-text">No appointments found.</p>
        </div>
      )}

      {appointments.length > 0 && (
        <div className="card">
          <div className="table-container">
            <table className="table">
              <thead>
                <tr>
                  <th>{isAdmin || isDoctor ? 'Patient' : 'Doctor'}</th>
                  <th>Date</th>
                  <th>Time</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {appointments.map((appointment) => (
                  <tr key={appointment.id}>
                      <td>
                      <div style={{ fontWeight: 500, color: '#111827' }}>
                        {isAdmin || isDoctor ? appointment.user?.name : appointment.doctor?.name}
                      </div>
                      <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                        {isAdmin || isDoctor ? appointment.user?.email : appointment.doctor?.email}
                      </div>
                      {isAdmin && (
                        <>
                          <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.5rem', fontWeight: 500 }}>
                            Doctor: {appointment.doctor?.name}
                          </div>
                          <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                            {appointment.doctor?.specialization}
                          </div>
                        </>
                      )}
                      {isDoctor && appointment.doctor && (
                        <div style={{ fontSize: '0.875rem', color: '#6b7280', marginTop: '0.25rem' }}>
                          {appointment.doctor.specialization}
                        </div>
                      )}
                    </td>
                    <td>{formatDate(appointment.appointmentDate)}</td>
                    <td>{formatTime(appointment.appointmentTime)}</td>
                    <td>{getStatusBadge(appointment.status)}</td>
                    <td style={{ textAlign: 'right' }}>
                      <div className="appointment-actions">
                        {(isAdmin || isDoctor) && appointment.status === 'PENDING' && (
                          <>
                            <button
                              onClick={() => handleApprove(appointment.id)}
                              className="btn-action btn-approve"
                            >
                              Approve
                            </button>
                            <button
                              onClick={() => handleReject(appointment.id)}
                              className="btn-action btn-reject"
                            >
                              Reject
                            </button>
                          </>
                        )}
                        <button
                          onClick={() => handleDelete(appointment.id)}
                          className="btn-action btn-delete"
                        >
                          {isAdmin || isDoctor ? 'Delete' : 'Cancel'}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};