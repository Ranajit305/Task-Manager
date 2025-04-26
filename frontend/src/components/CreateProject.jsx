import React, { useState } from "react";
import { X, FolderPlus, Loader } from "lucide-react";
import { useProjectStore } from "../stores/useProject";

const CreateProject = ({ setProjectModal }) => {
  const { createProject, loading } = useProjectStore();
  const [name, setName] = useState("");

  const handleCreateProject = async (e) => {
    e.preventDefault();
    await createProject(name);
    setProjectModal(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div
        className="absolute inset-0 bg-[rgba(0,0,0,0.3)] backdrop-blur-sm"
        onClick={() => setProjectModal(false)}
      />

      <div className="relative w-full max-w-md bg-white rounded-xl shadow-xl z-10">
        <div className="flex items-center justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            <FolderPlus className="w-6 h-6 text-purple-600" />
            <h2 className="text-xl font-semibold text-gray-800">
              Create New Project
            </h2>
          </div>
          <button
            onClick={() => setProjectModal(false)}
            className="p-1 rounded-full hover:bg-gray-100 transition"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-5">
          <form onSubmit={handleCreateProject} className="space-y-1">
            <label className="text-sm font-medium text-gray-700">
              Project Name
            </label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="My Awesome Project"
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none"
            />
            <div className="flex items-center justify-end pt-5">
              <button
                type="submit"
                className="px-4 py-2 bg-purple-600 text-white hover:bg-purple-700 rounded-lg transition cursor-pointer"
              >
                {loading ? (
                  <Loader className="animate-spin" />
                ) : (
                  "Create Project"
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default CreateProject;
