import React, { useState } from "react";
import {
  Clock,
  ChevronDown,
  ChevronUp,
  Flag,
  Calendar,
  User,
  Edit,
  Circle,
  Trash,
  CheckCircle,
  PauseCircle
} from "lucide-react";
import EditTask from "../components/EditTask";
import { useAuthStore } from "../stores/useAuthStore";
import { useTaskStore } from "../stores/useTaskStore";

const Tasks = ({ tasks }) => {
  const { user } = useAuthStore();
  const { deleteTask } = useTaskStore();

  const [currentTask, setCurrentTask] = useState(null);
  const [expandedTask, setExpandedTask] = useState(null);
  const [editTaskModal, setEditTaskModal] = useState(false);

  const getStatusIcon = (status) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "paused":
        return <PauseCircle className="w-5 h-5 text-red-500" />;
      default:
        return <Circle className="w-5 h-5 text-blue-500" />;
    }
  };

  const toggleExpandTask = (taskId) => {
    setExpandedTask(expandedTask === taskId ? null : taskId);
  };

  const handleEditModal = (task) => {
    setCurrentTask(task);
    setEditTaskModal(true);
  };

  return (
    <div className="space-y-4">
      {tasks.map((task, index) => (
        <div
          key={index}
          className="bg-white rounded-xl shadow-sm overflow-hidden transition-all duration-200"
        >
          <div
            className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50"
            onClick={() => toggleExpandTask(task._id)}
          >
            <div className="flex items-center gap-4">
              {getStatusIcon(task.status)}
              <div>
                <h3 className="font-medium text-gray-800">{task.title}</h3>
                <div className="flex items-center gap-2 text-sm text-gray-500 mt-1">
                  <Clock className="w-4 h-4" />
                  <span>
                    {new Date(task.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                </div>
              </div>
            </div>
            <button className="text-gray-400 hover:text-gray-600">
              {expandedTask === task._id ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
          </div>

          {expandedTask === task._id && (
            <div className="p-4 border-t border-gray-100">
              <div className="flex flex-col gap-3">
                <p className="text-gray-600">{task.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Flag className="w-4 h-4" />
                      <span>Priority: {task.priority}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Due:{" "}
                        {new Date(task.dueDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <div
                      className={`flex items-center gap-2 text-sm text-gray-500 ${
                        task.assignedTo._id === user._id &&
                        task.createdBy._id === user._id &&
                        "hidden"
                      }`}
                    >
                      <User className="w-4 h-4" />
                      <span>
                        Assigned to: {task.assignedTo?.name || "Unknown"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-gray-500">
                      <User className="w-4 h-4" />
                      <span>
                        Created by: {task.createdBy?.name || "Unknown"}
                      </span>
                    </div>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button
                      onClick={() => handleEditModal(task)}
                      className="p-2 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition cursor-pointer"
                    >
                      <Edit className="w-5 h-5" />
                    </button>
                    {task.createdBy._id === user._id && (
                      <button
                        onClick={() => deleteTask(task._id)}
                        className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition cursor-pointer"
                      >
                        <Trash className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {editTaskModal && (
        <EditTask setEditTaskModal={setEditTaskModal} task={currentTask} />
      )}
    </div>
  );
};

export default Tasks;
