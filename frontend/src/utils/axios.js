import axios from 'axios'

const base = import.meta.env.VITE_BACKEND_URL || 'http://localhost:5000';

export const axiosUrl = axios.create({
    baseURL: `${base}/api`,
    withCredentials: true
})