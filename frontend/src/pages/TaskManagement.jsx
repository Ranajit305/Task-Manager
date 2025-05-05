import React, { useState } from "react";
import {
  AlertTriangle,
  Share2,
  Users,
  ClipboardList,
  ArrowLeft,
  List
} from "lucide-react";
import MyTasks from "../components/MyTasks";
import TasksAssigned from "../components/TasksAssigned";
import { Link } from "react-router-dom";
import TaskGiven from "../components/TaskGiven";
import OverdueTasks from "../components/OverdueTasks";
import AllTasks from "./AllTasks";

const TaskManagement = () => {
  const [tab, setTab] = useState(0);
  const [createTaskModal, setCreateTaskModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center px-4 py-8">
      <div className="w-full max-w-6xl flex flex-col">
        <div className="flex justify-between items-center mb-8">
          <div className="w-full flex items-center justify-between ">
            <div className="flex items-center gap-2">
              <Link to="/dashboard">
                <ArrowLeft className="w-6 h-6 text-purple-600 cursor-pointer" />
              </Link>
              <h1 className="text-xl sm:text-2xl font-bold text-purple-600">
                Task Management
              </h1>
            </div>

            {(tab === 1 || tab === 2) && (
              <button
                onClick={() => setCreateTaskModal(true)}
                className="bg-purple-600 hover:bg-purple-700 text-white text-sm sm:text-base px-4 py-2 rounded-lg cursor-pointer transition-all duration-300"
              >
                {tab === 1 ? "Create Task" : "Assign Task"}
              </button>
            )}
          </div>
        </div>

        {/* Tabs Section */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2 mb-8">
          <button
            onClick={() => setTab(0)}
            className={`p-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
              tab === 0
                ? "bg-purple-600 text-white shadow-md"
                : "bg-white hover:bg-gray-100 text-gray-700"
            }`}
          >
            <List className="w-5 h-5" />
            <span>All Tasks</span>
          </button>

          <button
            onClick={() => setTab(1)}
            className={`p-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
              tab === 1
                ? "bg-purple-600 text-white shadow-md"
                : "bg-white hover:bg-gray-100 text-gray-700"
            }`}
          >
            <ClipboardList className="w-5 h-5" />
            <span>My Tasks</span>
          </button>

          <button
            onClick={() => setTab(2)}
            className={`p-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
              tab === 2
                ? "bg-purple-600 text-white shadow-md"
                : "bg-white hover:bg-gray-100 text-gray-700"
            }`}
          >
            <Users className="w-5 h-5" />
            <span>Tasks Assigned</span>
          </button>

          <button
            onClick={() => setTab(3)}
            className={`p-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
              tab === 3
                ? "bg-purple-600 text-white shadow-md"
                : "bg-white hover:bg-gray-100 text-gray-700"
            }`}
          >
            <Share2 className="w-5 h-5" />
            <span>Task Given</span>
          </button>

          <button
            onClick={() => setTab(4)}
            className={`p-3 rounded-lg transition-all duration-200 flex items-center justify-center gap-2 ${
              tab === 4
                ? "bg-purple-600 text-white shadow-md"
                : "bg-white hover:bg-gray-100 text-gray-700"
            }`}
          >
            <AlertTriangle className="w-5 h-5" />
            <span>Overdue Tasks</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="flex-grow">
          {tab === 0 && <AllTasks setTab={setTab}/>}
          {tab === 1 && (
            <MyTasks
              createTaskModal={createTaskModal}
              setCreateTaskModal={setCreateTaskModal}
              tab={tab}
            />
          )}
          {tab === 2 && (
            <TasksAssigned
              createTaskModal={createTaskModal}
              setCreateTaskModal={setCreateTaskModal}
              tab={tab}
            />
          )}
          {tab === 3 && <TaskGiven />}
          {tab === 4 && <OverdueTasks />}
        </div>
      </div>
    </div>
  );
};

export default TaskManagement;
