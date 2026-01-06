import { useEffect, useState } from 'react';
import { doctorAPI } from '../services/api';
import { useAuth } from '../context/AuthContext';
import './DoctorProfile.css';

export const DoctorProfile = () => {
  const { user } = useAuth();
  const [doctor, setDoctor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    phone: '',
    email: '',
  });
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const doctors = await doctorAPI.getAll();
        const foundDoctor = doctors.find((d) => d.email === user.email);
        if (foundDoctor) {
          setDoctor(foundDoctor);
          setFormData({
            name: foundDoctor.name || '',
            specialization: foundDoctor.specialization || '',
            phone: foundDoctor.phone || '',
            email: foundDoctor.email || '',
          });
        } else {
          setFormData({
            name: user.email.split('@')[0],
            specialization: '',
            phone: '',
            email: user.email,
          });
          setEditing(true);
        }
      } catch (error) {
        console.error('Error fetching doctor:', error);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      fetchDoctor();
    }
  }, [user]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      if (doctor) {
        await doctorAPI.update(doctor.id, formData);
        setMessage('Profile updated successfully!');
      } else {
        const newDoctor = await doctorAPI.create(formData);
        setDoctor(newDoctor);
        setMessage('Profile created successfully!');
      }
      setEditing(false);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to save profile');
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading">Loading...</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="card">
        <div className="profile-header">
          <h1 className="page-title">Doctor Profile</h1>
          {!editing && (
            <button onClick={() => setEditing(true)} className="btn btn-primary">
              Edit Profile
            </button>
          )}
        </div>

        {message && (
          <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-error'}`}>
            {message}
          </div>
        )}

        {editing ? (
          <form onSubmit={handleSubmit} className="profile-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="specialization" className="form-label">
                Specialization
              </label>
              <input
                type="text"
                id="specialization"
                name="specialization"
                required
                placeholder="e.g., Cardiologist, Pediatrician"
                value={formData.specialization}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                style={{ backgroundColor: '#f9fafb' }}
                readOnly
              />
              <p className="form-hint">Email cannot be changed</p>
            </div>

            <div className="form-actions">
              <button
                type="button"
                onClick={() => {
                  setEditing(false);
                  if (doctor) {
                    setFormData({
                      name: doctor.name || '',
                      specialization: doctor.specialization || '',
                      phone: doctor.phone || '',
                      email: doctor.email || '',
                    });
                  }
                }}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button type="submit" className="btn btn-primary">
                Save Profile
              </button>
            </div>
          </form>
        ) : (
          <div className="profile-view">
            <div className="profile-avatar-section">
              <div className="profile-avatar">👨‍⚕️</div>
              <div>
                <h2 className="profile-name">{formData.name || 'Not set'}</h2>
                <p className="profile-specialization">{formData.specialization || 'Not set'}</p>
              </div>
            </div>

            <div className="profile-details">
              <div className="profile-detail-item">
                <span className="profile-detail-label">Email:</span>
                <p>{formData.email}</p>
              </div>
              {formData.phone && (
                <div className="profile-detail-item">
                  <span className="profile-detail-label">Phone:</span>
                  <p>{formData.phone}</p>
                </div>
              )}
              <div className="profile-detail-item">
                <span className="profile-detail-label">Specialization:</span>
                <p>{formData.specialization || 'Not set'}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};