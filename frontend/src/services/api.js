import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para agregar token de autenticación
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor para manejar errores de autenticación
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token');
      localStorage.removeItem('refresh_token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (data) => api.post('/auth/register', data),
  logout: () => api.post('/auth/logout'),
  me: () => api.get('/auth/me'),
  refreshToken: (token) => api.post('/auth/refresh', { refresh_token: token }),
};

// Companies API
export const companiesAPI = {
  getAll: (params) => api.get('/companies/', { params }),
  getById: (id) => api.get(`/companies/${id}`),
  getStats: (id) => api.get(`/companies/${id}/stats`),
  create: (data) => api.post('/companies/', data),
  update: (id, data) => api.put(`/companies/${id}`, data),
  delete: (id) => api.delete(`/companies/${id}`),
};

// Users API
export const usersAPI = {
  getAll: (params) => api.get('/users/', { params }),
  getById: (id) => api.get(`/users/${id}`),
  create: (data) => api.post('/users/', data),
  update: (id, data) => api.put(`/users/${id}`, data),
  changePassword: (id, data) => api.patch(`/users/${id}/password`, data),
  delete: (id) => api.delete(`/users/${id}`),
};

// Assessments API
export const assessmentsAPI = {
  getAll: (params) => api.get('/assessments/', { params }),
  getById: (id) => api.get(`/assessments/${id}`),
  create: (data) => api.post('/assessments/', data),
  update: (id, data) => api.put(`/assessments/${id}`, data),
  delete: (id) => api.delete(`/assessments/${id}`),
  getResults: (id) => api.get(`/assessments/${id}/results`),
  getCategoryResults: (id) => api.get(`/assessments/${id}/categories`),
  saveAnswers: (id, answers) => api.post(`/assessments/${id}/answers`, answers),
  complete: (id) => api.patch(`/assessments/${id}/complete`),
};

// Dashboard API
export const dashboardAPI = {
  getAdminStats: () => api.get('/dashboard/admin'),
  getCompanyStats: (companyId) => api.get(`/dashboard/company/${companyId}`),
  getAuditorStats: () => api.get('/dashboard/auditor'),
  getComplianceByCategory: (params) => api.get('/dashboard/compliance-by-category', { params }),
  getRecentActivity: (params) => api.get('/dashboard/recent-activity', { params }),
};

// Questions API
export const questionsAPI = {
  getQuestionnaires: (params) => api.get('/questions/questionnaires', { params }),
  getQuestionnaire: (id) => api.get(`/questions/questionnaires/${id}`),
  createQuestionnaire: (data) => api.post('/questions/questionnaires', data),
  updateQuestionnaire: (id, data) => api.put(`/questions/questionnaires/${id}`, data),
  getCategories: (versionId) => api.get(`/questions/versions/${versionId}/categories`),
  getQuestionsByCategory: (categoryId) => api.get(`/questions/categories/${categoryId}/questions`),
  createQuestion: (data) => api.post('/questions/questions', data),
  updateQuestion: (id, data) => api.put(`/questions/questions/${id}`, data),
};

// Reports API
export const reportsAPI = {
  getAll: (params) => api.get('/reports/', { params }),
  getById: (id) => api.get(`/reports/${id}`),
  download: (id) => api.get(`/reports/${id}/download`, { responseType: 'blob' }),
  generate: (assessmentId) => api.post(`/reports/generate/${assessmentId}`),
};

// AI API
export const aiAPI = {
  chat: (data) => api.post('/ai/chat', data),
  getConversations: (params) => api.get('/ai/conversations', { params }),
  getConversation: (id) => api.get(`/ai/conversations/${id}`),
  deleteConversation: (id) => api.delete(`/ai/conversations/${id}`),
  analyzeAssessment: (assessmentId) => api.post(`/ai/analyze-assessment?assessment_id=${assessmentId}`),
  getRecommendations: (params) => api.get('/ai/recommendations', { params }),
  generateRecommendations: (assessmentId) => api.post(`/ai/generate-recommendations?assessment_id=${assessmentId}`),
};

// Notifications API
export const notificationsAPI = {
  getAll: (params) => api.get('/notifications/', { params }),
  getUnreadCount: () => api.get('/notifications/unread-count'),
  markAsRead: (id) => api.patch(`/notifications/${id}/read`),
  markAllAsRead: () => api.patch('/notifications/read-all'),
};

export default api;
