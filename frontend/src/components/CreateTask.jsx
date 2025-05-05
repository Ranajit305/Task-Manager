import React, { useEffect, useState } from "react";
import { X, FolderPlus, Loader, ChevronDown, AlertCircle } from "lucide-react";
import { useTaskStore } from "../stores/useTaskStore";
import { useAuthStore } from "../stores/useAuthStore";
import SearchUser from "./SearchUser";

const CreateTask = ({ setCreateTaskModal, tab }) => {
  const { user } = useAuthStore();
  const { createTask, loading } = useTaskStore();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("Medium");
  const [dueDate, setDueDate] = useState("");
  const [assignedTo, setAssignedTo] = useState("");
  const [isValid, setIsValid] = useState(false);

  const handleCreateTask = async (e) => {
    e.preventDefault();
    if (tab === 1) {
      await createTask(title, description, priority, dueDate, user._id);
    } else {
      await createTask(title, description, priority, dueDate, assignedTo);
    }
    setCreateTaskModal(false);
  };

  useEffect(() => {
    const requiredFieldsValid =
      title.trim() !== "" && description.trim() !== "" && priority && dueDate;

    if (tab === 2) {
      setIsValid(requiredFieldsValid && assignedTo);
    } else {
      setIsValid(requiredFieldsValid);
    }
  }, [title, description, priority, dueDate, assignedTo, tab]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-[rgba(0,0,0,0.3)] backdrop-blur-sm" />
      <div className="relative w-full max-w-md bg-white rounded-xl shadow-xl z-10">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <FolderPlus className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-800">
              Create New Task
            </h2>
          </div>
          <button
            onClick={() => setCreateTaskModal(false)}
            className="p-1 rounded-full hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <form onSubmit={handleCreateTask} className="space-y-4">
            {/* Title */}
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                Title <span className="text-red-500">*</span>
              </label>
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
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                Description <span className="text-red-500">*</span>
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Connection with MongoDB & SQL"
                rows={3}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
                required
              />
            </div>

            {/* Priority */}
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                Priority <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <select
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none appearance-none"
                  required
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            {/* Due Date */}
            <div>
              <label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                Due Date <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="date"
                  value={dueDate}
                  onChange={(e) => setDueDate(e.target.value)}
                  min={new Date().toISOString().split("T")[0]}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none
                 cursor-pointer"
                  required
                  onClick={(e) => e.target.showPicker()}
                />
              </div>
            </div>

            {/* Assigned To (Conditional) */}
            {tab === 2 && <SearchUser setAssignedTo={setAssignedTo} />}

            {/* Submit Button */}
            <div className="flex items-center justify-between pt-4">
              {!isValid && (
                <div className="flex items-center gap-1 text-sm text-red-500">
                  <AlertCircle className="h-4 w-4" />
                  <span>Please fill all required fields</span>
                </div>
              )}
              <button
                type="submit"
                disabled={!isValid || loading}
                className={`px-4 py-2 rounded-lg transition cursor-pointer flex items-center gap-2 ${
                  isValid
                    ? "bg-purple-600 text-white hover:bg-purple-700"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <>
                    <Loader className="animate-spin h-4 w-4" />
                    <span>Creating...</span>
                  </>
                ) : (
                  "Create Task"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
