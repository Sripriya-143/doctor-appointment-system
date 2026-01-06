import { useEffect, useState } from 'react';
import { doctorAPI, userAPI } from '../services/api';
import './ManageDoctors.css';

export const ManageDoctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    phone: '',
    email: '',
    password: '',
  });

  useEffect(() => {
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const data = await doctorAPI.getAll();
      setDoctors(data);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      setMessage('Failed to load doctors');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddDoctor = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      // First create the user account with DOCTOR role
      try {
        await userAPI.register({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          role: 'DOCTOR',
        });
      } catch (userError) {
        console.error('User creation error:', userError);
        let errorMsg = 'Failed to create user account. Email may already exist.';
        
        if (userError.response) {
          // Backend returns error message as plain string in response.data
          if (typeof userError.response.data === 'string') {
            errorMsg = userError.response.data;
          } else if (userError.response.data?.message) {
            errorMsg = userError.response.data.message;
          }
        } else if (userError.message) {
          errorMsg = userError.message;
        }
        
        setMessage(errorMsg);
        setLoading(false);
        return;
      }

      // Then create the doctor profile
      try {
        await doctorAPI.create({
          name: formData.name,
          specialization: formData.specialization,
          phone: formData.phone || '',
          email: formData.email,
        });

        setMessage('Doctor added successfully!');
        setShowAddForm(false);
        setFormData({
          name: '',
          specialization: '',
          phone: '',
          email: '',
          password: '',
        });
        fetchDoctors();
      } catch (doctorError) {
        console.error('Doctor creation error:', doctorError);
        // If doctor creation fails, try to delete the user we just created
        try {
          const users = await userAPI.getAll();
          const createdUser = users.find(u => u.email === formData.email);
          if (createdUser) {
            await userAPI.delete(createdUser.id);
          }
        } catch (cleanupError) {
          console.error('Cleanup error:', cleanupError);
        }
        
        let errorMsg = 'Failed to create doctor profile.';
        
        if (doctorError.response) {
          // Backend returns error message as plain string in response.data
          if (typeof doctorError.response.data === 'string') {
            errorMsg = doctorError.response.data;
          } else if (doctorError.response.data?.message) {
            errorMsg = doctorError.response.data.message;
          }
        } else if (doctorError.message) {
          errorMsg = doctorError.message;
        }
        
        setMessage(errorMsg);
      }
    } catch (error) {
      console.error('Unexpected error:', error);
      let errorMsg = 'Failed to add doctor';
      
      if (error.response) {
        if (typeof error.response.data === 'string') {
          errorMsg = error.response.data;
        } else if (error.response.data?.message) {
          errorMsg = error.response.data.message;
        }
      } else if (error.message) {
        errorMsg = error.message;
      }
      
      setMessage(errorMsg);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, email) => {
    if (!window.confirm(`Are you sure you want to delete doctor: ${email}?`)) {
      return;
    }
    try {
      await doctorAPI.delete(id);
      setMessage('Doctor deleted successfully!');
      fetchDoctors();
    } catch (error) {
      console.error('Error deleting doctor:', error);
      setMessage('Failed to delete doctor');
    }
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading">Loading doctors...</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 className="page-title">Manage Doctors</h1>
            <p className="page-subtitle">Add, view, and remove doctors from the system</p>
          </div>
          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="btn btn-primary"
          >
            {showAddForm ? 'Cancel' : '+ Add Doctor'}
          </button>
        </div>
      </div>

      {message && (
        <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-error'}`}>
          {message}
        </div>
      )}

      {showAddForm && (
        <div className="card" style={{ marginBottom: '2rem' }}>
          <h2 className="card-title">Add New Doctor</h2>
          <form onSubmit={handleAddDoctor} className="doctor-form">
            <div className="form-group">
              <label htmlFor="name" className="form-label">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="form-input"
                value={formData.name}
                onChange={handleChange}
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
                className="form-input"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="form-group">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                id="password"
                name="password"
                required
                className="form-input"
                value={formData.password}
                onChange={handleChange}
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
                className="form-input"
                placeholder="e.g., Cardiologist, Pediatrician"
                value={formData.specialization}
                onChange={handleChange}
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
                className="form-input"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="form-actions">
              <button type="submit" className="btn btn-primary" disabled={loading}>
                {loading ? 'Adding...' : 'Add Doctor'}
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Specialization</th>
                <th>Email</th>
                <th>Phone</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {doctors.length === 0 ? (
                <tr>
                  <td colSpan="6" style={{ textAlign: 'center', padding: '2rem' }}>
                    No doctors found. Add a doctor to get started.
                  </td>
                </tr>
              ) : (
                doctors.map((doctor) => (
                  <tr key={doctor.id}>
                    <td>{doctor.id}</td>
                    <td style={{ fontWeight: 500 }}>{doctor.name}</td>
                    <td>{doctor.specialization}</td>
                    <td>{doctor.email}</td>
                    <td>{doctor.phone || 'N/A'}</td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        onClick={() => handleDelete(doctor.id, doctor.email)}
                        className="btn-action btn-delete"
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};