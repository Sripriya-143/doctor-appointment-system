import { useEffect, useState } from 'react';
import { userAPI } from '../services/api';
import './ManageUsers.css';

export const ManageUsers = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = await userAPI.getAll();
      setUsers(data);
    } catch (error) {
      console.error('Error fetching users:', error);
      setMessage('Failed to load users');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id, email) => {
    if (!window.confirm(`Are you sure you want to delete user: ${email}?`)) {
      return;
    }
    try {
      await userAPI.delete(id);
      setMessage('User deleted successfully!');
      fetchUsers();
    } catch (error) {
      console.error('Error deleting user:', error);
      setMessage('Failed to delete user');
    }
  };

  const getRoleBadge = (role) => {
    const styles = {
      USER: { bg: '#dbeafe', text: '#1e40af', label: 'Patient' },
      DOCTOR: { bg: '#d1fae5', text: '#065f46', label: 'Doctor' },
      ADMIN: { bg: '#fef3c7', text: '#92400e', label: 'Admin' },
    };
    const style = styles[role] || { bg: '#f3f4f6', text: '#374151', label: role };

    return (
      <span
        style={{
          backgroundColor: style.bg,
          color: style.text,
          padding: '0.25rem 0.75rem',
          borderRadius: '9999px',
          fontSize: '0.75rem',
          fontWeight: 600,
        }}
      >
        {style.label}
      </span>
    );
  };

  if (loading) {
    return (
      <div className="page-container">
        <div className="loading">Loading users...</div>
      </div>
    );
  }

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Manage Users</h1>
        <p className="page-subtitle">View and manage all system users</p>
      </div>

      {message && (
        <div className={`alert ${message.includes('success') ? 'alert-success' : 'alert-error'}`}>
          {message}
        </div>
      )}

      <div className="card">
        <div className="table-container">
          <table className="table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Role</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td colSpan="5" style={{ textAlign: 'center', padding: '2rem' }}>
                    No users found
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.id}</td>
                    <td style={{ fontWeight: 500 }}>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{getRoleBadge(user.role)}</td>
                    <td style={{ textAlign: 'right' }}>
                      {user.role !== 'ADMIN' && (
                        <button
                          onClick={() => handleDelete(user.id, user.email)}
                          className="btn-action btn-delete"
                        >
                          Delete
                        </button>
                      )}
                      {user.role === 'ADMIN' && (
                        <span style={{ color: '#6b7280', fontSize: '0.875rem' }}>
                          Protected
                        </span>
                      )}
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