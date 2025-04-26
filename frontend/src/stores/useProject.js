import { create } from 'zustand'
import { axiosUrl } from '../utils/axios';

export const useProjectStore = create ((set, get) => ({
    projects: [],
    loading: false,

    getProjects: async () => {
        set ({ loading: true });
        try {
            const res = await axiosUrl.get('/project');
            if (res.data.success) {
                set({ projects: res.data.projects });
            }
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            set ({ loading: false });
        }
    },

    createProject: async (name) => {
        set({ loading: true });
        try {
            const res = await axiosUrl.post('/project', { name });
            if (res.data.success) {
                set((state) => ({
                    projects: [...state.projects, res.data.project]
                }))
            }
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            set({ loading: false });
        }
    },

    deleteProject: async (projectId) => {
        try {
            const res = await axiosUrl.delete(`/project/${projectId}`);
            if (res.data.success) {
                set((state) => ({
                    projects: state.projects.filter((project) => project._id !== projectId)
                }))
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
}))