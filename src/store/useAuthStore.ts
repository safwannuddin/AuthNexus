import { create } from 'zustand';
import { User } from '../types';
import { getUserProfile, mockApi } from '../utils/api';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  fetchUserProfile: () => Promise<void>;
}

// For demo purposes, we'll use a mock implementation
export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  
  login: async (email: string, password: string) => {
    set({ isLoading: true, error: null });
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock successful login for demo
      if (email && password) {
        const { data } = await mockApi.getUserProfile();
        
        if (data) {
          set({ 
            user: data, 
            isAuthenticated: true, 
            isLoading: false 
          });
          localStorage.setItem('authToken', 'mock-token');
          return true;
        }
      }
      
      set({ 
        error: 'Invalid credentials', 
        isLoading: false 
      });
      return false;
    } catch (error) {
      set({ 
        error: 'Failed to log in', 
        isLoading: false 
      });
      return false;
    }
  },
  
  logout: () => {
    localStorage.removeItem('authToken');
    set({ 
      user: null, 
      isAuthenticated: false 
    });
  },
  
  fetchUserProfile: async () => {
    set({ isLoading: true });
    
    try {
      // In a real app, we would call the actual API
      const { success, data, error } = await mockApi.getUserProfile();
      
      if (success && data) {
        set({ 
          user: data, 
          isAuthenticated: true, 
          isLoading: false 
        });
      } else {
        set({ 
          error: error || 'Failed to fetch profile', 
          isLoading: false 
        });
      }
    } catch (error) {
      set({ 
        error: 'Failed to fetch profile', 
        isLoading: false 
      });
    }
  },
}));