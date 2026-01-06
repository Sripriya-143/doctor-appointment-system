import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { doctorAPI, appointmentAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './BookAppointment.css';

export const BookAppointment = () => {
  const { doctorId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    date: '',
    time: '',
  });

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const data = await doctorAPI.getById(doctorId);
        setDoctor(data);
      } catch (error) {
        console.error('Error fetching doctor:', error);
        setError('Doctor not found');
      } finally {
        setLoading(false);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSubmitting(true);

    try {
      const appointmentData = {
        userId: user.userId,
        doctorId: parseInt(doctorId),
        date: formData.date,
        time: formData.time,
      };

      await appointmentAPI.book(appointmentData);
      navigate('/appointments', { state: { message: 'Appointment booked successfully!' } });
    } catch (error) {
      setError(error.response?.data?.message || 'Failed to book appointment. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  // Get minimum date (today)
  const today = new Date().toISOString().split('T')[0];
  // Get maximum date (30 days from now)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);
  const maxDateStr = maxDate.toISOString().split('T')[0];

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  if (!doctor) {
    return (
      <div className="page-container">
        <div className="alert alert-error">Doctor not found</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <button onClick={() => navigate(-1)} className="back-button">
        ← Back
      </button>

      <div className="card doctor-info-card">
        <div className="doctor-info-header">
          <div className="doctor-info-avatar">👨‍⚕️</div>
          <div>
            <h2 className="doctor-info-name">{doctor.name}</h2>
            <p className="doctor-info-specialization">{doctor.specialization}</p>
          </div>
        </div>
        <div className="doctor-info-details">
          <p>
            <span className="detail-label">Email:</span> {doctor.email}
          </p>
          {doctor.phone && (
            <p>
              <span className="detail-label">Phone:</span> {doctor.phone}
            </p>
          )}
        </div>
      </div>

      <div className="card">
        <h3 className="card-title">Book Appointment</h3>

        {error && <div className="alert alert-error">{error}</div>}

        <form onSubmit={handleSubmit} className="appointment-form">
          <div className="form-group">
            <label htmlFor="date" className="form-label">
              Select Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              required
              min={today}
              max={maxDateStr}
              value={formData.date}
              onChange={handleChange}
              className="form-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="time" className="form-label">
              Select Time
            </label>
            <input
              type="time"
              id="time"
              name="time"
              required
              value={formData.time}
              onChange={handleChange}
              className="form-input"
            />
            <p className="form-hint">Please select a time between 9:00 AM and 5:00 PM</p>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate(-1)}
              className="btn btn-outline"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="btn btn-primary"
            >
              {submitting ? 'Booking...' : 'Book Appointment'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};