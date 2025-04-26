import React, { useEffect, useState } from "react";
import {
  Grid3x3,
  Folder,
  Clock,
  Plus,
  Smile,
  LogOut,
  Loader,
} from "lucide-react";
import { useProjectStore } from "../stores/useProject";
import { useAuthStore } from "../stores/useAuthStore";
import CreateProject from "../components/CreateProject";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const { logout } = useAuthStore();
  const { projects, getProjects, loading } = useProjectStore();

  const [projectModal, setProjectModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    getProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-lg flex flex-col min-h-[93vh]">
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <Grid3x3 className="w-6 h-6 text-purple-600" />
            <h1 className="text-2xl font-bold text-gray-800">My Projects</h1>
          </div>
          <div className="flex gap-3">
            {projects.length < 4 && (
              <button
                onClick={() => setProjectModal(true)}
                className="p-2 rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition flex items-center gap-2 cursor-pointer"
              >
                <Plus className="w-5 h-5" />
                <span className="hidden sm:inline">New Project</span>
              </button>
            )}
            <button
              onClick={() => logout()}
              className="p-2 rounded-lg bg-red-500 text-white hover:bg-red-600 transition flex items-center gap-2 cursor-pointer"
            >
              <LogOut className="w-5 h-5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>

        {projectModal && <CreateProject setProjectModal={setProjectModal} />}

        {loading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin text-purple-600 h-8 w-8" />
          </div>
        ) : projects.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {projects.map((project, index) => (
              <div
                key={index}
                onClick={() => navigate(`/${project._id}`, { state: { project } })}
                className="flex flex-col p-4 border border-gray-200 rounded-xl hover:bg-gray-50 transition cursor-pointer h-full"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="p-2 bg-purple-100 rounded-lg text-purple-600">
                    <Folder className="w-5 h-5" />
                  </div>
                  <h3 className="font-medium text-gray-800 truncate">
                    {project.name}
                  </h3>
                </div>
                <div className="flex items-center gap-1 text-sm text-gray-500 mt-auto">
                  <Clock className="w-4 h-4" />
                  <span>
                    {new Date(project.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    })}
                  </span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex-grow flex flex-col items-center justify-center text-center space-y-4">
            <Smile className="w-16 h-16 text-gray-400" />
            <h3 className="text-xl font-medium text-gray-700">
              No projects yet
            </h3>
            <p className="text-gray-500 max-w-md">
              Get started by creating your first project to organize your work
            </p>
            <button
              onClick={() => setProjectModal(true)}
              className="mt-4 px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Create Project
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
