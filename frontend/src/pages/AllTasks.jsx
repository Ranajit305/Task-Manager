import React, { useState, useEffect } from "react";
import {
  ClipboardList,
  Search,
  Filter,
  X,
  Calendar,
  ChevronDown,
  Clock,
} from "lucide-react";
import Tasks from "./Tasks";
import { useTaskStore } from "../stores/useTaskStore";

const AllTasks = ({ setTab }) => {
  const { tasks } = useTaskStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [filtersOpen, setFiltersOpen] = useState(false);
  const [filters, setFilters] = useState({
    status: [],
    priority: [],
    dueDate: null,
  });

  useEffect(() => {
    const filtered = tasks.filter((task) => {
      // Search filter
      const matchesSearch =
        searchTerm === "" ||
        task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (task.description &&
          task.description.toLowerCase().includes(searchTerm.toLowerCase()));

      // Status filter
      const matchesStatus =
        filters.status.length === 0 || filters.status.includes(task.status);

      // Priority filter
      const matchesPriority =
        filters.priority.length === 0 ||
        filters.priority.includes(task.priority);

      // Due date filter
      let matchesDueDate = true;
      if (filters.dueDate) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const taskDate = new Date(task.dueDate);
        taskDate.setHours(0, 0, 0, 0);

        const oneDay = 24 * 60 * 60 * 1000;
        const daysUntilDue = Math.round((taskDate - today) / oneDay);

        switch (filters.dueDate) {
          case "today":
            matchesDueDate = daysUntilDue === 0;
            break;
          case "tomorrow":
            matchesDueDate = daysUntilDue === 1;
            break;
          case "thisWeek":
            matchesDueDate = daysUntilDue >= 0 && daysUntilDue <= 6;
            break;
          case "nextWeek":
            matchesDueDate = daysUntilDue >= 7 && daysUntilDue <= 13;
            break;
          case "overdue":
            matchesDueDate = daysUntilDue < 0;
            break;
          default:
            matchesDueDate = true;
        }
      }

      return (
        matchesSearch && matchesStatus && matchesPriority && matchesDueDate
      );
    });

    setFilteredTasks(filtered);
  }, [searchTerm, filters, tasks]);

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm("");
    setFilters({
      status: [],
      priority: [],
      dueDate: null,
    });
  };

  // Toggle filter status/priority
  const toggleFilter = (type, value) => {
    setFilters((prev) => {
      const current = [...prev[type]];
      const index = current.indexOf(value);

      if (index === -1) {
        current.push(value);
      } else {
        current.splice(index, 1);
      }

      return {
        ...prev,
        [type]: current,
      };
    });
  };

  // Set due date filter
  const setDueDateFilter = (value) => {
    setFilters((prev) => ({
      ...prev,
      dueDate: prev.dueDate === value ? null : value,
    }));
  };

  // Count how many filters are active
  const activeFilterCount =
    filters.status.length + filters.priority.length + (filters.dueDate ? 1 : 0);

  return (
    <div className="space-y-4">
      {/* Search and Filter Controls */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        {/* Search Box */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="w-5 h-5 text-gray-400" />
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full p-2.5 pl-10 text-sm bg-white border border-gray-200 outline-none rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Search tasks by title or description..."
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm("")}
              className="absolute inset-y-0 right-0 flex items-center pr-3"
            >
              <X className="w-5 h-5 text-gray-400 hover:text-gray-600" />
            </button>
          )}
        </div>

        {/* Filter Button and Counter */}
        <div className="flex items-center gap-2">
          {activeFilterCount > 0 && (
            <div className="flex items-center">
              <button
                onClick={clearFilters}
                className="text-sm text-purple-600 hover:text-purple-800 mr-3"
              >
                Clear filters
              </button>
              <span className="bg-purple-100 text-purple-800 text-xs font-medium px-2.5 py-1 rounded-full">
                {activeFilterCount}
              </span>
            </div>
          )}
          <button
            onClick={() => setFiltersOpen(!filtersOpen)}
            className={`flex items-center gap-2 px-4 py-2.5 text-sm font-medium rounded-lg border ${
              filtersOpen || activeFilterCount > 0
                ? "bg-purple-50 text-purple-700 border-purple-200"
                : "bg-white text-gray-700 border-gray-200"
            }`}
          >
            <Filter className="w-4 h-4" />
            Filters
            <ChevronDown
              className={`w-4 h-4 transition-transform ${
                filtersOpen ? "transform rotate-180" : ""
              }`}
            />
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {filtersOpen && (
        <div className="p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
            {/* Status Filters */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Status
              </label>
              <div className="flex flex-wrap gap-2">
                {["ongoing", "paused", "completed"].map((status) => (
                  <button
                    key={status}
                    onClick={() => toggleFilter("status", status)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full capitalize ${
                      filters.status.includes(status)
                        ? "bg-purple-100 text-purple-800"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {status}
                  </button>
                ))}
              </div>
            </div>

            {/* Priority Filters */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Priority
              </label>
              <div className="flex flex-wrap gap-2">
                {["Low", "Medium", "High"].map((priority) => (
                  <button
                    key={priority}
                    onClick={() => toggleFilter("priority", priority)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full ${
                      filters.priority.includes(priority)
                        ? "bg-purple-100 text-purple-800"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {priority}
                  </button>
                ))}
              </div>
            </div>

            {/* Due Date Filters */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                Due Date
              </label>
              <div className="flex flex-wrap gap-2">
                {[
                  { id: "today", label: "Today" },
                  { id: "tomorrow", label: "Tomorrow" },
                  { id: "thisWeek", label: "This Week" },
                  { id: "nextWeek", label: "Next Week" },
                  { id: "overdue", label: "Overdue" },
                ].map((dateOption) => (
                  <button
                    key={dateOption.id}
                    onClick={() => setDueDateFilter(dateOption.id)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full flex items-center gap-1 ${
                      filters.dueDate === dateOption.id
                        ? "bg-purple-100 text-purple-800"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {dateOption.id === "overdue" ? (
                      <Clock className="w-3 h-3" />
                    ) : (
                      <Calendar className="w-3 h-3" />
                    )}
                    {dateOption.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Task List or Empty State */}
      {tasks.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col items-center justify-center space-y-4 px-4">
            <div className="p-4 bg-gray-50 rounded-full">
              <ClipboardList className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700">
              No tasks found
            </h3>
            <p className="text-gray-500 max-w-md">
              Get started by creating your first task
            </p>
            <button
              onClick={() => setTab(1)}
              className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 bg-gradient-to-r from-purple-600 to-purple-700 text-white font-medium rounded-lg hover:from-purple-700 hover:to-purple-800 transition-all duration-200 shadow-sm"
            >
              Start Creating Task
            </button>
          </div>
        </div>
      ) : filteredTasks.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-sm border border-gray-100">
          <div className="flex flex-col items-center justify-center space-y-4 px-4">
            <div className="p-4 bg-gray-50 rounded-full">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-700">
              No matching tasks
            </h3>
            <p className="text-gray-500 max-w-md">
              Try adjusting your search or filters to find what you're looking
              for
            </p>
            <button
              onClick={clearFilters}
              className="mt-4 inline-flex items-center gap-2 px-6 py-2.5 bg-white border border-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-all duration-200"
            >
              Clear all filters
            </button>
          </div>
        </div>
      ) : (
        <Tasks tasks={filteredTasks} />
      )}
    </div>
  );
};

export default AllTasks;
