import { defineStore } from 'pinia';
import type { User, LoginData } from '../types/User';
import { authService } from '../services/auth';

interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
}

export const useAuthStore = defineStore('auth', {
  state: (): AuthState => ({
    user: JSON.parse(localStorage.getItem('user') || 'null'),
    token: localStorage.getItem('auth_token'),
    isAuthenticated: !!localStorage.getItem('auth_token'),
  }),

  actions: {
    async login(credentials: LoginData) {
      try {
        const response = await authService.login(credentials);
        this.token = response.access_token;
        this.user = response.user;
        this.isAuthenticated = true;

        // Store in localStorage
        localStorage.setItem('auth_token', response.access_token);
        localStorage.setItem('user', JSON.stringify(response.user));

        return response;
      } catch (error: any) {
        throw error.response?.data || error;
      }
    },

    async logout() {
      try {
        await authService.logout();
      } catch (error) {
        console.error('Logout error:', error);
      } finally {
        this.$reset();
        localStorage.removeItem('auth_token');
        localStorage.removeItem('user');
      }
    },

    async fetchUserProfile() {
      try {
        const user = await authService.getUserProfile();
        this.user = user;
        localStorage.setItem('user', JSON.stringify(user));
        return user;
      } catch (error: any) {
        this.logout();
        throw error.response?.data || error;
      }
    }
  }
});