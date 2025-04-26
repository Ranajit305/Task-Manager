import { create } from "zustand"
import { axiosUrl } from "../utils/axios"

export const useTaskStore = create((set, get) => ({
    tasks: [],
    loading: false,

    getTasks: async (projectId) => {
        set({ loading: true });
        try {
            const res = await axiosUrl.get(`/task/${projectId}`);
            if (res.data.success) {
                set({ tasks: res.data.tasks });
            }
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            set({ loading: false });
        }
    },
    
    createTask: async (projectId, title, description) => {
        set({ loading: true });
        try {
            const res = await axiosUrl.post(`/task/${projectId}`, { title, description });
            if (res.data.success) {
                set((state) => ({
                    tasks: [...state.tasks, res.data.task]
                }))
            }
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            set({ loading: false });
        }
    },

    updateTask: async (taskId, title, description, status) => {
        set({ loading: true });
        try {
            const res = await axiosUrl.put(`/task/${taskId}`, { title, description, status });
            if (res.data.success) {
                set((state) => ({
                    tasks: state.tasks.map((task) =>
                      task._id === taskId
                        ? { ...task, title, description, status }
                        : task
                    )
                  }));
            }
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            set({ loading: false });
        }
    },

    deleteTask: async (taskId) => {
        try {
            const res = await axiosUrl.delete(`/task/${taskId}`);
            if (res.data.success) {
                set((state) => ({
                    tasks: state.tasks.filter((task) => task._id !== taskId)
                }))
            }
        } catch (error) {
            console.log(error.response.data.message);
        }
    }
}))