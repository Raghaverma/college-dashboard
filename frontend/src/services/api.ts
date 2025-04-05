import axios from 'axios';

// Use environment variable or fallback to localhost
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if it exists
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    // Ensure headers object exists
    config.headers = config.headers || {};
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

interface User {
  id: string;
  email: string;
  name: string;
  role: string;
  avatar?: string;
}

interface AuthResponse {
  token: string;
  user: User;
}

export const auth = {
  login: async (email: string, password: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/login', { email, password });
    return response.data;
  },

  register: async (email: string, password: string, name: string): Promise<AuthResponse> => {
    const response = await api.post<AuthResponse>('/auth/register', { email, password, name });
    return response.data;
  },

  googleLogin: () => {
    window.location.href = `${API_URL}/auth/google`;
  },

  handleGoogleCallback: async (token: string): Promise<User> => {
    localStorage.setItem('token', token);
    const response = await api.get<User>('/users/me');
    return response.data;
  },

  logout: () => {
    localStorage.removeItem('token');
  },
};

export const users = {
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<User>('/users/me');
    return response.data;
  },

  updateProfile: async (data: { name?: string; avatar?: string }): Promise<User> => {
    const response = await api.put<User>('/users/me', data);
    return response.data;
  },
};

export default {
  auth,
  users,
}; 