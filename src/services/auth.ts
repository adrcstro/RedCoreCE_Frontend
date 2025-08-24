import apiClient from './api';
import type { LoginData, User } from '../types/User';

export const authService = {
  async login(credentials: LoginData) {
    const response = await apiClient.post('/auth/login', credentials);
    return response.data;
  },

  async logout() {
    const response = await apiClient.post('/auth/logout');
    return response.data;
  },

  async getUserProfile() {
    const response = await apiClient.get('/auth/user-profile');
    return response.data;
  }
};

export const userService = {
  async getUsers() {
    const response = await apiClient.get('/users');
    return response.data;
  },

  async getUser(id: number) {
    const response = await apiClient.get(`/users/${id}`);
    return response.data;
  },

  async createUser(user: User) {
    const response = await apiClient.post('/users', user);
    return response.data;
  },

  async updateUser(id: number, user: User) {
    const response = await apiClient.put(`/users/${id}`, user);
    return response.data;
  },

  async deleteUser(id: number) {
    const response = await apiClient.delete(`/users/${id}`);
    return response.data;
  }
};

export const roleService = {
  async getRoles() {
    const response = await apiClient.get('/roles');
    return response.data;
  },

  async getRole(id: number) {
    const response = await apiClient.get(`/roles/${id}`);
    return response.data;
  },

  async createRole(role: any) {
    const response = await apiClient.post('/roles', role);
    return response.data;
  },

  async updateRole(id: number, role: any) {
    const response = await apiClient.put(`/roles/${id}`, role);
    return response.data;
  },

  async deleteRole(id: number) {
    const response = await apiClient.delete(`/roles/${id}`);
    return response.data;
  }
};