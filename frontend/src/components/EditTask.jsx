import React, { useState } from "react";
import { X, FolderPlus, Loader } from "lucide-react";
import { useTaskStore } from "../stores/useTaskStore";
import { useAuthStore } from "../stores/useAuthStore";

const EditTask = ({ setEditTaskModal, task }) => {
  const { user } = useAuthStore();
  const { updateTask, loading } = useTaskStore();

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState(task.status);
  const [priority, setPriority] = useState(task.priority);
  const [dueDate, setDueDate] = useState(task.dueDate);

  const hanldeUpdateTask = async (e) => {
    e.preventDefault();
    await updateTask(task._id, title, description, status, priority, dueDate);
    setEditTaskModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[rgba(0,0,0,0.3)] backdrop-blur-sm"
        onClick={() => setEditTaskModal(false)}
      />
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-xl z-10">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <FolderPlus className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-800">Update Task</h2>
          </div>
          <button
            onClick={() => setEditTaskModal(false)}
            className="p-1 rounded-full hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <form onSubmit={hanldeUpdateTask} className="space-y-1">
            {/* Title */}
            <div className={`${user._id !== task.createdBy._id && "hidden"}`}>
              <label className="text-sm font-medium text-gray-700">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                type="text"
                placeholder="Database Integration"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                required
              />
            </div>

            {/* Description */}
            <div className={`${user._id !== task.createdBy._id && "hidden"}`}>
              <label className="text-sm font-medium text-gray-700">
                Description
              </label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                type="text"
                placeholder="Connection with MonogDB & SQL"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                required
              />
            </div>

            {/* Status */}
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Status
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                required
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="ongoing">Ongoing</option>
                <option value="paused">Paused</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            {/* Priority */}
            <div className={`${user._id !== task.createdBy._id && "hidden"}`}>
              <label className="text-sm font-medium text-gray-700 mb-1 block">
                Priority
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                required
              >
                <option value="" disabled>
                  Select Priority
                </option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>

            {/* Due Date */}
            <div className={`${user._id !== task.createdBy._id && "hidden"}`}>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                Due Date <span className="text-red-500 mb-1">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={dueDate ? dueDate.split("T")[0] : ""}
                  onChange={(e) => setDueDate(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none cursor-pointer"
                  required
                  onClick={(e) => e.target.showPicker()}
                />
              </div>
            </div>
            <div className="flex items-center justify-end pt-5">
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded-lg transition cursor-pointer"
              >
                {loading ? <Loader className="animate-spin" /> : "Update Task"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
