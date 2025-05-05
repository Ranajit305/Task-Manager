import React from "react";
import { ClipboardList } from "lucide-react";
import { useTaskStore } from "../stores/useTaskStore";
import { useAuthStore } from "../stores/useAuthStore";
import Tasks from "../pages/Tasks";

const TaskGiven = () => {
  const { user } = useAuthStore();
  const { tasks, loading } = useTaskStore();

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const givenTasks = tasks.filter((task) => {
    const dueDate = new Date(task.dueDate);
    return (
      task.createdBy._id !== user._id &&
      task.assignedTo._id === user._id &&
      (task.status === "completed" || dueDate >= today)
    );
  });

  return (
    <div>
      {loading ? (
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-purple-500"></div>
        </div>
      ) : givenTasks.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col items-center justify-center space-y-4 px-4">
            <div className="p-4 bg-gray-50 rounded-full">
              <ClipboardList className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700">
              No tasks given to you
            </h3>
            <p className="text-gray-500 max-w-md">
              You don't have any tasks given by others
            </p>
          </div>
        </div>
      ) : (
        <Tasks tasks={givenTasks} />
      )}
    </div>
  );
};

export default TaskGiven;
