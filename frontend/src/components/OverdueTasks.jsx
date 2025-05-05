import React from "react";
import { ClipboardList, Plus } from "lucide-react";
import { useAuthStore } from "../stores/useAuthStore";
import { useTaskStore } from "../stores/useTaskStore";
import Tasks from "../pages/Tasks";

const OverdueTasks = () => {
  const { user } = useAuthStore();
  const { tasks, loading } = useTaskStore();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const overdueTasks = tasks.filter((task) => {
    const dueDate = new Date(task.dueDate);
    return dueDate < today && task.status !== "completed";
  });

  return (
    <div>
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : overdueTasks.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col items-center justify-center space-y-4 px-4">
            <div className="p-4 bg-gray-50 rounded-full">
              <ClipboardList className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700">
              No Overdue tasks
            </h3>
            <p className="text-gray-500 max-w-md">
              Well Done - You don't have any tasks overdue
            </p>
          </div>
        </div>
      ) : (
        <Tasks tasks={overdueTasks} />
      )}
    </div>
  );
};

export default OverdueTasks;
