import { create } from "zustand"
import { axiosUrl } from "../utils/axios"

export const useTaskStore = create((set, get) => ({
    tasks: [],
    loading: false,

    getTasks: async () => {
        set({ loading: true });
        try {
            const res = await axiosUrl.get(`/task`);
            if (res.data.success) {
                set({ tasks: res.data.tasks });
            }
        } catch (error) {
            console.log(error.response.data.message);
        } finally {
            set({ loading: false });
        }
    },
    
    createTask: async (title, description, priority, dueDate, assignedTo) => {
        set({ loading: true });
        try {
            const res = await axiosUrl.post(`/task`, { title, description, priority, dueDate, assignedTo });
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

    updateTask: async (taskId, title, description, status, priority, dueDate) => {
        set({ loading: true });
        try {
            const res = await axiosUrl.put(`/task/${taskId}`, { title, description, status, priority, dueDate });
            if (res.data.success) {
                set((state) => ({
                    tasks: state.tasks.map((task) =>
                      task._id === taskId
                        ? { ...task, title, description, status, priority, dueDate }
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