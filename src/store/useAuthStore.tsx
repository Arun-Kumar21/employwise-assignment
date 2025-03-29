import { create } from "zustand";

export type User =  {
  id: string;
  email: string;
  first_name: string;
  last_name: string;
  avatar: string;
}

interface AuthStore {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  login: (user: User, token: string) => void;
  updateUser: (updatedUser: User) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: JSON.parse(localStorage.getItem('user') || 'null'),
  token: localStorage.getItem('token') || null,

  isAuthenticated: !!localStorage.getItem('token'),

  login: (user, token) => {
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('token', token);
    set({user, token, isAuthenticated: true})
  },

  updateUser: (updatedUser) => {
    set({user: updatedUser})
    localStorage.removeItem('user')
    localStorage.setItem('user', JSON.stringify(updatedUser));
  },

  logout: () => {
    localStorage.removeItem('user')
    localStorage.removeItem('token')
    set({user: null, token: null, isAuthenticated: false})
  }
}))