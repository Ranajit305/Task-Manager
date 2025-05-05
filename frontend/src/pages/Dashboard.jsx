import {
  ClipboardList,
  Users,
  Share2,
  AlertCircle,
  Loader,
} from "lucide-react";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { Link } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";
import { useTaskStore } from "../stores/useTaskStore";
import { useEffect } from "react";

const Dashboard = () => {
  const { user, logout } = useAuthStore();
  const { tasks, getTasks, loading } = useTaskStore();

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

  const assignedTasks = tasks.filter((task) => {
    const dueDate = new Date(task.dueDate);

    const isAssigned =
      task.createdBy?._id === user._id && task.assignedTo?._id !== user._id;

    const isDueInFutureOrToday = dueDate >= today;
    const isPastButCompleted = dueDate < today && task.status === "completed";

    return isAssigned && (isDueInFutureOrToday || isPastButCompleted);
  });

  const taskGiven = tasks.filter((task) => {
    const dueDate = new Date(task.dueDate);
    return (
      task.createdBy._id !== user._id &&
      task.assignedTo._id === user._id &&
      (task.status === "completed" || dueDate >= today)
    );
  });

  const overdueTasks = tasks.filter((task) => {
    const dueDate = new Date(task.dueDate);
    return dueDate < today && task.status !== "completed";
  });

  const taskCounts = {
    myTasks: myTasks.length,
    assignedTasks: assignedTasks.length,
    taskGiven: taskGiven.length,
    overdueTasks: overdueTasks.length,
  };

  const stats = [
    {
      title: "My Tasks",
      value: taskCounts.myTasks,
      icon: <ClipboardList className="h-5 w-5 text-white" />,
      color: "bg-blue-500",
    },
    {
      title: "Assigned Tasks",
      value: taskCounts.assignedTasks,
      icon: <Users className="h-5 w-5 text-white" />,
      color: "bg-purple-500",
    },
    {
      title: "Given Tasks",
      value: taskCounts.taskGiven,
      icon: <Share2 className="h-5 w-5 text-white" />,
      color: "bg-indigo-500",
    },
    {
      title: "Overdue Tasks",
      value: taskCounts.overdueTasks,
      icon: <AlertCircle className="h-5 w-5 text-white" />,
      color: "bg-pink-500",
    },
  ];

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center px-4 py-8">
      {loading ? (
        <Loader className="animate-spin text-indigo-600 w-10 h-10" />
      ) : (
        <div className="mx-auto md:w-[70%] w-full">
          <div className="flex flex-col space-y-3 sm:flex-row sm:space-y-0 items-center justify-between pb-10">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-indigo-900">
                Welcome, <span className="text-indigo-600">{user.name}</span>
              </h1>
            </div>
            <div className="flex items-center gap-3">
              <Link
                to="/tasks"
                className="bg-green-600 hover:bg-green-700 text-white rounded-lg px-4 py-2 cursor-pointer transition-all duration-200"
              >
                Task Management
              </Link>
              <button
                onClick={() => logout()}
                className="bg-red-600 hover:bg-red-700 text-white rounded-lg px-4 py-2 cursor-pointer transition-all duration-200"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-6 mb-6 sm:mb-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="bg-white rounded-lg sm:rounded-xl shadow-xs sm:shadow-sm p-4 sm:p-6 border border-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs sm:text-sm font-medium text-gray-500">
                      {stat.title}
                    </p>
                    <p className="text-xl sm:text-2xl font-bold mt-1 sm:mt-2 text-gray-800">
                      {stat.value}
                    </p>
                  </div>
                  <div
                    className={`p-2 sm:p-3 rounded-md sm:rounded-lg ${stat.color}`}
                  >
                    {stat.icon}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Chart Section */}
          <div className="bg-white rounded-lg sm:rounded-xl shadow-xs sm:shadow-sm p-4 sm:p-6 border border-gray-100 mb-6 sm:mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 sm:mb-6 gap-3 sm:gap-0">
              <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                Task Summary
              </h2>
            </div>

            <div className="w-full">
              {/* Bar Chart */}
              <div className="h-[300px] sm:h-[400px] md:h-[450px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={stats}
                    margin={{ top: 20, right: 20, bottom: 20 }}
                    barCategoryGap="20%"
                    barGap={8}
                  >
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="#f0f0f0"
                    />
                    {/* Remove XAxis labels completely */}
                    <XAxis hide />
                    <YAxis
                      tick={{ fontSize: 12 }}
                      axisLine={false}
                      tickLine={false}
                    />
                    <Tooltip />
                    <Bar
                      dataKey="value"
                      name="Tasks"
                      radius={[6, 6, 0, 0]}
                      activeBar={{ fillOpacity: 1 }} // Remove hover effect
                    >
                      {stats.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            entry.color.includes("blue")
                              ? "#3b82f6"
                              : entry.color.includes("purple")
                              ? "#8b5cf6"
                              : entry.color.includes("indigo")
                              ? "#6366f1"
                              : entry.color.includes("pink")
                              ? "#ec4899"
                              : "#a3a3a3"
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>

              {/* Custom Legend */}
              <div className="mt-4 flex flex-wrap justify-center gap-4">
                {stats.map((entry, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <span
                      className="inline-block w-4 h-4 rounded-full"
                      style={{
                        backgroundColor: entry.color.includes("blue")
                          ? "#3b82f6"
                          : entry.color.includes("purple")
                          ? "#8b5cf6"
                          : entry.color.includes("indigo")
                          ? "#6366f1"
                          : entry.color.includes("pink")
                          ? "#ec4899"
                          : "#a3a3a3",
                      }}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {entry.title}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
