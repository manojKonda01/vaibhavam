import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken,
          });

          const { accessToken } = response.data;
          localStorage.setItem('accessToken', accessToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Refresh failed, redirect to login
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }

    return Promise.reject(error);
  }
);

export const authAPI = {
  register: (data: any) => api.post('/auth/register', data),
  login: (data: any) => api.post('/auth/login', data),
  logout: (data: any) => api.post('/auth/logout', data),
  refresh: (data: any) => api.post('/auth/refresh', data),
  getProfile: () => api.get('/auth/profile'),
};

export const plannerAPI = {
  getPlanners: (params?: any) => api.get('/planners', { params }),
  getPlannerById: (id: string) => api.get(`/planners/${id}`),
  createProfile: (data: any) => api.post('/planners/profile', data),
  uploadPortfolio: (data: any) => api.post('/planners/portfolio', data),
};

export const eventAPI = {
  createEvent: (data: any) => api.post('/events', data),
  getEvents: (params?: any) => api.get('/events', { params }),
  getEventById: (id: string) => api.get(`/events/${id}`),
  updateEventStatus: (id: string, data: any) => api.put(`/events/${id}/status`, data),
};

export const productAPI = {
  getProducts: (params?: any) => api.get('/products', { params }),
  createProduct: (data: any) => api.post('/products', data),
  updateProduct: (id: string, data: any) => api.put(`/products/${id}`, data),
  deleteProduct: (id: string) => api.delete(`/products/${id}`),
};

export const cartAPI = {
  getCart: () => api.get('/cart'),
  addToCart: (data: any) => api.post('/cart/add', data),
  removeFromCart: (data: any) => api.post('/cart/remove', data),
};

export const orderAPI = {
  createOrder: (data: any) => api.post('/orders', data),
  getOrders: (params?: any) => api.get('/orders', { params }),
};

export default api;