import { create } from 'zustand';
import axios from 'axios';

const useUserStore = create((set) => ({
  user: null,
  setUser: (userData) => set({ user: userData }),
  clearUser: () => set({ user: null }),

  fetchUser: async (token) => {
    try {
      const response = await axios.get('https://back-yhh6.onrender.com/api/auth/profile', {
        headers: { Authorization: `Bearer ${token}` },
      });
      set({ user: response.data });
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  },
}));

export default useUserStore;
