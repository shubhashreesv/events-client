// src/services/api.js
import axios from 'axios';

// Create axios instance with base configuration
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('userRole');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  signup: (userData) => api.post('/auth/signup', userData),
  verify: () => api.get('/auth/verify'),
  logout: () => api.post('/auth/logout'),
  forgotPassword: (email) => api.post('/auth/forgot-password', { email }),
  resetPassword: (token, newPassword) => api.post('/auth/reset-password', { token, newPassword }),
};

// Events API
export const eventsAPI = {
  getAll: () => api.get('/events'),
  getById: (id) => api.get(`/events/${id}`),
  create: (eventData) => api.post('/events', eventData),
  update: (id, eventData) => api.put(`/events/${id}`, eventData),
  delete: (id) => api.delete(`/events/${id}`),
  register: (eventId, registrationData) => api.post(`/events/${eventId}/register`, registrationData),
  getRegistrations: (eventId) => api.get(`/events/${eventId}/registrations`),
  getMyRegistrations: () => api.get('/events/my-registrations'),
};

// Student API
export const studentAPI = {
  getEvents: () => api.get('/student/events'),
  registerForEvent: (eventId) => api.post(`/student/events/${eventId}/register`),
  getRegisteredEvents: () => api.get('/student/registered-events'),
  getNotifications: () => api.get('/student/notifications'),
  markNotificationAsRead: (notificationId) => api.patch(`/student/notifications/${notificationId}/read`),
  getProfile: () => api.get('/student/profile'),
  updateProfile: (profileData) => api.put('/student/profile', profileData),
};

// Club API
export const clubAPI = {
  getDashboard: () => api.get('/club/dashboard'),
  createEvent: (eventData) => api.post('/club/events', eventData),
  getEvents: () => api.get('/club/events'),
  getEvent: (eventId) => api.get(`/club/events/${eventId}`),
  updateEvent: (eventId, eventData) => api.put(`/club/events/${eventId}`, eventData),
  deleteEvent: (eventId) => api.delete(`/club/events/${eventId}`),
  getEventRegistrations: (eventId) => api.get(`/club/events/${eventId}/registrations`),
  getAnalytics: () => api.get('/club/analytics'),
  getNotifications: () => api.get('/club/notifications'),
  updateProfile: (profileData) => api.put('/club/profile', profileData),
  getContacts: () => api.get('/club/contacts'),
};

// Admin API
export const adminAPI = {
  getDashboard: () => api.get('/admin/dashboard'),
  getUsers: () => api.get('/admin/users'),
  createUser: (userData) => api.post('/admin/users', userData),
  updateUser: (userId, userData) => api.put(`/admin/users/${userId}`, userData),
  deleteUser: (userId) => api.delete(`/admin/users/${userId}`),
  getClubs: () => api.get('/admin/clubs'),
  approveClub: (clubId) => api.patch(`/admin/clubs/${clubId}/approve`),
  suspendClub: (clubId) => api.patch(`/admin/clubs/${clubId}/suspend`),
  getNotifications: () => api.get('/admin/notifications'),
  getSystemAnalytics: () => api.get('/admin/analytics'),
};

export default api;