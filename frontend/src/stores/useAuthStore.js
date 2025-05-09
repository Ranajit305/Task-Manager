import { create } from 'zustand'
import { axiosUrl } from '../utils/axios';
import toast from 'react-hot-toast';

export const useAuthStore = create((set, get) => ({
    user: null,
    filteredUsers: [],
    loadingUsers: false,
    loading: false,

    checkAuth: async () => {
        set({ loading: true });
        try {
            const res = await axiosUrl.get('/user/auth');
            if (res.data.success) {
                set({ user: res.data.user })
            }
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            set({ loading: false });
        }
    },

    signup: async (name, email, password) => {
        set({ loading: true });
        try {
            const res = await axiosUrl.post('/user/signup', {name, email, password});
            if (res.data.success) {
                set({ user: res.data.user })
            }
        } catch (error) {
            toast.dismiss();
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
        } finally {
            set({ loading: false });
        }
    },

    login: async (email, password) => {
        set({ loading: true });
        try {
            const res = await axiosUrl.post('/user/login', {email, password});
            if (res.data.success) {
                set({ user: res.data.user })
            }
        } catch (error) {
            toast.dismiss();
            toast.error(error.response.data.message);
            console.log(error.response.data.message);
        } finally {
            set({ loading: false });
        }
    },

    logout: async () => {
        set({ userLoading: true });
        try {
            const res = await axiosUrl.post('/user/logout');
            if (res.data.success) {
                set({ user: null })
            }
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            set({ userLoading: false });
        }
    },

    searchUsers: async (q) => {
        set({ loadingUsers: true });
        try {
            const res = await axiosUrl.get('/user/search', { params: { q } });
            if (res.data.success) {
                set({ filteredUsers: res.data.users })
            }
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            set({ loadingUsers: false });
        }
    }
}))