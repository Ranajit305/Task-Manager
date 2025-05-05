import React, { useState } from "react";
import { ClipboardList, Plus } from "lucide-react";
import { useTaskStore } from "../stores/useTaskStore";
import { useAuthStore } from "../stores/useAuthStore";
import CreateTask from "./CreateTask";
import Tasks from "../pages/Tasks";

const MyTasks = ({ createTaskModal, setCreateTaskModal, tab }) => {
  const { tasks, loading } = useTaskStore();
  const { user } = useAuthStore();

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const myTasks = tasks.filter((task) => {
    const dueDate = new Date(task.dueDate);
    return (
      task.createdBy._id === user._id &&
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
      ) : myTasks.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col items-center justify-center space-y-4 px-4">
            <div className="p-4 bg-gray-50 rounded-full">
              <ClipboardList className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700">
              No personal tasks yet
            </h3>
            <p className="text-gray-500 max-w-md">
              You haven't created any tasks for yourself
            </p>
            <button
              onClick={() => setCreateTaskModal(true)}
              className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-sm"
            >
              <Plus className="w-5 h-5" />
              Create New Task
            </button>
          </div>
        </div>
      ) : (
        <Tasks tasks={myTasks} />
      )}

      {createTaskModal && (
        <CreateTask setCreateTaskModal={setCreateTaskModal} tab={tab} />
      )}
    </div>
  );
};

export default MyTasks;
