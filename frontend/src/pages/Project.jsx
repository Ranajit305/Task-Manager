import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Link, useParams } from "react-router-dom";
import { Plus, ArrowLeft } from "lucide-react";
import { useTaskStore } from "../stores/useTaskStore";
import CreateTask from "../components/CreateTask";
import { useProjectStore } from "../stores/useProject";
import Tasks from "../components/Tasks";

const Project = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { projectId } = useParams();
  const { project } = location.state || {};

  const { deleteProject } = useProjectStore();
  const { getTasks } = useTaskStore();
  const [taskModal, setTaskModal] = useState(false);

  useEffect(() => {
    getTasks(projectId);
  }, [projectId]);

  const handleDeleteProject = async () => {
    await deleteProject(projectId);
    navigate("/home");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-4xl bg-white p-8 rounded-2xl shadow-lg flex flex-col min-h-[93vh]">
        <div className="flex items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <Link
              to="/home"
              className="p-2 rounded-full hover:bg-gray-200 transition"
            >
              <ArrowLeft className="w-6 h-6 text-gray-700" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-800">{project.name}</h1>
          </div>
        </div>

        <div className="mb-6 flex items-center justify-between">
          <button
            onClick={() => setTaskModal(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-purple-600 text-white text-sm sm:text-base rounded-lg hover:bg-purple-700 transition duration-200 cursor-pointer"
          >
            <Plus className="w-5 h-5" />
            Add Task
          </button>
          <button
            onClick={() => handleDeleteProject()}
            className="bg-red-500 hover:bg-red-600 text-white text-sm sm:text-base rounded-lg px-4 py-2 transition duration-200 cursor-pointer"
          >
            Delete Project
          </button>
        </div>

        {taskModal && (
          <CreateTask setTaskModal={setTaskModal} projectId={projectId} />
        )}

        <Tasks />
      </div>
    </div>
  );
};

export default Project;
