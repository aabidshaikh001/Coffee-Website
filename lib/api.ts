// Frontend API client for connecting to the backend

// Base API URL - would come from environment variables in production
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://backendcoffee-1.onrender.com/api';

// Helper to handle API responses
const handleResponse = async (response: Response) => {
  const data = await response.json();
  
  if (!response.ok) {
    const error = data.message || response.statusText;
    throw new Error(error);
  }
  
  return data;
};

// Get auth token from localStorage (client-side only)
const getToken = () => {
  if (typeof window !== 'undefined') {
    return localStorage.getItem('token');
  }
  return null;
};

// API client
export const api = {
  // Auth endpoints
  auth: {
    login: async (email: string, password: string) => {
      const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      
      const data = await handleResponse(response);
      
      // Store token in localStorage
      if (data.token) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));
      }
      
      return data;
    },
    
    logout: () => {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    },
    
    getCurrentUser: async () => {
      const token = getToken();
      if (!token) return null;
      
      const response = await fetch(`${API_URL}/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return handleResponse(response);
    },
  },
  
  // Menu endpoints
  menu: {
    getAll: async (params = {}) => {
      const queryString = new URLSearchParams(params as Record<string, string>).toString();
      const response = await fetch(`${API_URL}/menu?${queryString}`);
      return handleResponse(response);
    },
    
    getById: async (id: string) => {
      const response = await fetch(`${API_URL}/menu/${id}`);
      return handleResponse(response);
    },
    
    getFeatured: async () => {
      const response = await fetch(`${API_URL}/menu/featured`);
      return handleResponse(response);
    },
    
    getByCategory: async (category: string) => {
      const response = await fetch(`${API_URL}/menu/category/${category}`);
      return handleResponse(response);
    },
    
    create: async (menuItem: any) => {
      const token = getToken();
      if (!token) throw new Error('Authentication required');
      
      const response = await fetch(`${API_URL}/menu`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(menuItem),
      });
      
      return handleResponse(response);
    },
    
    update: async (id: string, menuItem: any) => {
      const token = getToken();
      if (!token) throw new Error('Authentication required');
      
      const response = await fetch(`${API_URL}/menu/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(menuItem),
      });
      
      return handleResponse(response);
    },
    
    delete: async (id: string) => {
      const token = getToken();
      if (!token) throw new Error('Authentication required');
      
      const response = await fetch(`${API_URL}/menu/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return handleResponse(response);
    },
  },
  
  // Location endpoints
  locations: {
    getAll: async (params = {}) => {
      const queryString = new URLSearchParams(params as Record<string, string>).toString();
      const response = await fetch(`${API_URL}/locations?${queryString}`);
      return handleResponse(response);
    },
    
    getById: async (id: string) => {
      const response = await fetch(`${API_URL}/locations/${id}`);
      return handleResponse(response);
    },
    
    getFeatured: async () => {
      const response = await fetch(`${API_URL}/locations/featured`);
      return handleResponse(response);
    },
    
    create: async (location: any) => {
      const token = getToken();
      if (!token) throw new Error('Authentication required');
      
      const response = await fetch(`${API_URL}/locations`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(location),
      });
      
      return handleResponse(response);
    },
    
    update: async (id: string, location: any) => {
      const token = getToken();
      if (!token) throw new Error('Authentication required');
      
      const response = await fetch(`${API_URL}/locations/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(location),
      });
      
      return handleResponse(response);
    },
    
    delete: async (id: string) => {
      const token = getToken();
      if (!token) throw new Error('Authentication required');
      
      const response = await fetch(`${API_URL}/locations/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return handleResponse(response);
    },
  },
  
  // User endpoints
  users: {
    getAll: async () => {
      const token = getToken();
      if (!token) throw new Error('Authentication required');
      
      const response = await fetch(`${API_URL}/users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return handleResponse(response);
    },
    
    getById: async (id: string) => {
      const token = getToken();
      if (!token) throw new Error('Authentication required');
      
      const response = await fetch(`${API_URL}/users/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return handleResponse(response);
    },
    
    update: async (id: string, userData: any) => {
      const token = getToken();
      if (!token) throw new Error('Authentication required');
      
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userData),
      });
      
      return handleResponse(response);
    },
    
    delete: async (id: string) => {
      const token = getToken();
      if (!token) throw new Error('Authentication required');
      
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      return handleResponse(response);
    },
    
    changePassword: async (id: string, currentPassword: string, newPassword: string) => {
      const token = getToken();
      if (!token) throw new Error('Authentication required');
      
      const response = await fetch(`${API_URL}/users/${id}/change-password`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      
      return handleResponse(response);
    },
  },
};

export default api;

