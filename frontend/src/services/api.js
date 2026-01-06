import axios from 'axios';

const API_BASE_URL = 'http://localhost:8081';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// User API
export const userAPI = {
  register: async (userData) => {
    try {
      const response = await api.post('/user/register', userData);
      return response.data;
    } catch (error) {
      // Re-throw to let the AuthContext handle it
      throw error;
    }
  },
  login: async (email, password) => {
    try {
      const response = await api.post('/user/login', { email, password });
      return response.data;
    } catch (error) {
      // Re-throw to let the AuthContext handle it
      throw error;
    }
  },
  getAll: async () => {
    const response = await api.get('/user');
    return response.data;
  },
  delete: async (id) => {
    await api.delete(`/user/${id}`);
  },
};

// Doctor API
export const doctorAPI = {
  getAll: async () => {
    const response = await api.get('/doctor');
    return response.data;
  },
  getById: async (id) => {
    const response = await api.get(`/doctor/${id}`);
    return response.data;
  },
  create: async (doctorData) => {
    const response = await api.post('/doctor', doctorData);
    return response.data;
  },
  update: async (id, doctorData) => {
    const response = await api.put(`/doctor/${id}`, doctorData);
    return response.data;
  },
  delete: async (id) => {
    const response = await api.delete(`/doctor/${id}`);
    return response.data;
  },
};

// Appointment API
export const appointmentAPI = {
  book: async (appointmentData) => {
    const response = await api.post('/appointment/book', appointmentData);
    return response.data;
  },
  getAll: async () => {
    const response = await api.get('/appointment');
    return response.data;
  },
  getByUser: async (userId) => {
    const response = await api.get(`/appointment/user/${userId}`);
    return response.data;
  },
  getByDoctor: async (doctorId) => {
    const response = await api.get(`/appointment/doctor/${doctorId}`);
    return response.data;
  },
  approve: async (id) => {
    const response = await api.put(`/appointment/approve/${id}`);
    return response.data;
  },
  reject: async (id) => {
    const response = await api.put(`/appointment/reject/${id}`);
    return response.data;
  },
  delete: async (id) => {
    await api.delete(`/appointment/${id}`);
  },
};

export default api;