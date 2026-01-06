import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { doctorAPI } from '../services/api';
import './Doctors.css';

export const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [specializationFilter, setSpecializationFilter] = useState('');

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await doctorAPI.getAll();
        setDoctors(data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const specializations = [...new Set(doctors.map((doc) => doc.specialization))];

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch = doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doctor.specialization.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSpecialization = !specializationFilter || doctor.specialization === specializationFilter;
    return matchesSearch && matchesSpecialization;
  });

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
        <h1 className="page-title">Find a Doctor</h1>
        <p className="page-subtitle">Browse our list of qualified doctors and book an appointment</p>
      </div>

      <div className="doctors-filters">
        <div className="filter-search">
          <input
            type="text"
            placeholder="Search by name or specialization..."
            className="form-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="filter-select">
          <select
            className="form-select"
            value={specializationFilter}
            onChange={(e) => setSpecializationFilter(e.target.value)}
          >
            <option value="">All Specializations</option>
            {specializations.map((spec) => (
              <option key={spec} value={spec}>
                {spec}
              </option>
            ))}
          </select>
        </div>
      </div>

      {filteredDoctors.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state-text">No doctors found matching your criteria.</p>
        </div>
      ) : (
        <div className="doctors-grid">
          {filteredDoctors.map((doctor) => (
            <div key={doctor.id} className="doctor-card">
              <div className="doctor-header">
                <div className="doctor-avatar">👨‍⚕️</div>
                <div className="doctor-info">
                  <h3 className="doctor-name">{doctor.name}</h3>
                  <p className="doctor-specialization">{doctor.specialization}</p>
                </div>
              </div>
              <div className="doctor-details">
                <p className="doctor-detail">
                  <span className="doctor-detail-icon">📧</span>
                  {doctor.email}
                </p>
                {doctor.phone && (
                  <p className="doctor-detail">
                    <span className="doctor-detail-icon">📞</span>
                    {doctor.phone}
                  </p>
                )}
              </div>
              <Link
                to={`/book-appointment/${doctor.id}`}
                className="btn btn-primary btn-full"
              >
                Book Appointment
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};