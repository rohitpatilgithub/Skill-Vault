import React, { useState } from "react";
import TasksCard from "../components/TasksCard";
import AddTaskForm from "../components/AddTaskForm";
import { useTaskContext } from "../contexts/TaskContext";
import { useThemeContext } from "../contexts/ThemeContext";
import { useAuthContext } from "../contexts/AuthContext";
import { Plus, BarChart3, Clock, DollarSign, CheckCircle2, Filter, Search } from 'lucide-react';
import tryImage from '../assets/try.png';
import tryImageWhite from '../assets/white try.png';

export const Home = () => {
  const { userTasks, addTask } = useTaskContext();
  const { colors, isDarkMode } = useThemeContext();
  const { user } = useAuthContext();
  const [add, setAdd] = useState(false);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  const handleAddTask = async (newTask) => {
    try {
      await addTask(newTask);
      setAdd(false);
    } catch (error) {
      console.log("Error adding task", error);
    }
  };

  // Calculate stats from tasks
  const completedTasks = userTasks.filter(task => task.status === 'completed').length;
  const inProgressTasks = userTasks.filter(task => task.status === 'in_progress').length;
  const totalTasks = userTasks.length;

  // Filter and search tasks
  const filteredTasks = userTasks.filter(task => {
    // Filter by status
    const statusMatch = filterStatus === 'all' || task.status === filterStatus;
    
    // Filter by search query (case insensitive)
    const searchMatch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    
    return statusMatch && searchMatch;
  });

  return (
    <div className="p-3 sm:p-4 md:p-6">
      {/* Main Header Section with Background */}
      <div className="mb-6 md:mb-8">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          {/* Left Section - Welcome Message with Background */}
          <div className="xl:col-span-2">
            <div 
              className={`${isDarkMode ? 'bg-gradient-to-r from-gray-800 to-gray-900' : 'bg-gradient-to-r from-blue-600 to-purple-600'} rounded-2xl sm:rounded-3xl p-4 sm:p-6 md:p-8 ${isDarkMode ? 'text-white' : 'text-black'} relative overflow-hidden`}
                style={{
                  backgroundImage: `url(${isDarkMode ? tryImage : tryImageWhite})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  backgroundBlendMode: isDarkMode ? 'overlay' : 'none'
                }}
            >
              <div className="relative z-10">
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-2 md:mb-3">Hello {user?.username || 'User'} !</h1>
                <p className={`${isDarkMode ? 'text-gray-300' : 'text-black'} text-base md:text-lg mb-4 md:mb-6`}>It's good to see you again.</p>
                <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold">{totalTasks}</div>
                    <div className={`${isDarkMode ? 'text-gray-400' : 'text-black'} text-xs sm:text-sm`}>Total Tasks</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold">{completedTasks}</div>
                    <div className={`${isDarkMode ? 'text-gray-400' : 'text-black'} text-xs sm:text-sm`}>Completed</div>
                  </div>
                  <div className="text-center">
                    <div className="text-xl sm:text-2xl font-bold">{inProgressTasks}</div>
                    <div className={`${isDarkMode ? 'text-gray-400' : 'text-black'} text-xs sm:text-sm`}>In Progress</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Section - Create Task Card */}
          <div className="xl:col-span-1">
            <div 
              className={`${isDarkMode ? 'bg-gray-800 text-white' : 'bg-white text-black'} rounded-2xl sm:rounded-3xl p-4 sm:p-6 h-full flex flex-col justify-between relative overflow-hidden`}
            >
              {/* decorative background image (full-bleed inside card, no opacity) */}
              <img
                src={isDarkMode ? tryImage : tryImageWhite}
                alt=""
                className="absolute inset-0 w-full h-full object-cover object-bottom pointer-events-none select-none z-0"
                style={{ transform: 'scale(1.28)', transformOrigin: 'center top' }}
              />
              <div className="relative z-10">
                <h3 className="text-lg sm:text-xl font-bold mb-1">Create Task</h3>
                <p className={`${isDarkMode ? 'text-gray-200' : 'text-black'} text-sm mb-4 sm:mb-6`}>Create a new task</p>
              </div>
              
              <div className="space-y-3 sm:space-y-4 relative z-10">
                <div>
                  <p className={`${isDarkMode ? 'text-gray-300' : 'text-gray-600'} text-xs sm:text-sm mb-2`}>Quick Action</p>
                  <button
                    onClick={() => setAdd(!add)}
                    className={`flex items-center justify-between w-full ${isDarkMode ? 'bg-gray-700/50 hover:bg-gray-600/50 text-white' : 'bg-white hover:bg-gray-50 text-black'} rounded-xl sm:rounded-2xl py-2.5 sm:py-3 px-3 sm:px-4 transition-all duration-200 group border ${isDarkMode ? 'border-white/20' : 'border-gray-200'}`}
                  >
                    <span className="font-medium text-sm sm:text-base">+ New Task</span>
                    <div className={`w-6 h-6 sm:w-8 sm:h-8 ${isDarkMode ? 'bg-white' : 'bg-gray-100'} rounded-md sm:rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200`}>
                      <Plus className="w-3 h-3 sm:w-4 sm:h-4 text-gray-900" />
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Cards Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
          <div className={`${colors.bg.secondary} p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm ${colors.border.secondary} border`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xl md:text-2xl font-bold ${colors.text.primary}`}>{totalTasks}</p>
                <p className={`${colors.text.secondary} text-sm md:text-base`}>Total Tasks</p>
              </div>
              <div className={`p-2 md:p-3 ${isDarkMode ? 'bg-blue-900/30' : 'bg-blue-100'} rounded-lg`}>
                <BarChart3 className={`w-5 h-5 md:w-6 md:h-6 ${isDarkMode ? 'text-blue-400' : 'text-blue-600'}`} />
              </div>
            </div>
          </div>

          <div className={`${colors.bg.secondary} p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm ${colors.border.secondary} border`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xl md:text-2xl font-bold ${colors.text.primary}`}>{completedTasks}</p>
                <p className={`${colors.text.secondary} text-sm md:text-base`}>Tasks Done</p>
              </div>
              <div className={`p-2 md:p-3 ${isDarkMode ? 'bg-green-900/30' : 'bg-green-100'} rounded-lg`}>
                <CheckCircle2 className={`w-5 h-5 md:w-6 md:h-6 ${isDarkMode ? 'text-green-400' : 'text-green-600'}`} />
              </div>
            </div>
          </div>

          <div className={`${colors.bg.secondary} p-4 md:p-6 rounded-xl md:rounded-2xl shadow-sm ${colors.border.secondary} border sm:col-span-2 lg:col-span-1`}>
            <div className="flex items-center justify-between">
              <div>
                <p className={`text-xl md:text-2xl font-bold ${colors.text.primary}`}>{inProgressTasks}</p>
                <p className={`${colors.text.secondary} text-sm md:text-base`}>In Progress</p>
              </div>
              <div className={`p-2 md:p-3 ${isDarkMode ? 'bg-orange-900/30' : 'bg-orange-100'} rounded-lg`}>
                <Clock className={`w-5 h-5 md:w-6 md:h-6 ${isDarkMode ? 'text-orange-400' : 'text-orange-600'}`} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Tasks Section */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 md:gap-4 mb-4 md:mb-6">
          <h2 className={`text-lg md:text-xl font-semibold ${colors.text.primary}`}>Your Tasks</h2>
          
          {/* Filter and Search Controls */}
          <div className="flex flex-col sm:flex-row gap-2 md:gap-3 w-full sm:w-auto">
            {/* Search Input */}
            <div className="relative">
              <Search className={`w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 ${colors.text.tertiary}`} />
              <input
                type="text"
                placeholder="Search tasks..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={`pl-10 pr-4 py-2 md:py-2.5 ${colors.border.primary} border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 w-full sm:w-48 md:w-64 ${colors.bg.secondary} ${colors.text.primary} text-sm md:text-base`}
              />
            </div>

            {/* Filter Dropdown */}
            <div className="relative">
              <Filter className={`w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 ${colors.text.tertiary}`} />
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className={`pl-10 pr-8 py-2 md:py-2.5 ${colors.border.primary} border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 appearance-none ${colors.bg.secondary} cursor-pointer w-full sm:w-36 md:w-40 ${colors.text.primary} text-sm md:text-base`}
              >
                <option value="all">All Tasks</option>
                <option value="not_started">Not Started</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="expired">Expired</option>
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className={`w-4 h-4 ${colors.text.tertiary}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Tasks Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 md:gap-4">
          {filteredTasks.length > 0 ? (
            filteredTasks.map((singular) => (
              <TasksCard
                key={singular._id}
                task={singular}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-8 md:py-12">
              <div className={colors.text.tertiary + " mb-4"}>
                <BarChart3 className="w-12 h-12 md:w-16 md:h-16 mx-auto" />
              </div>
              <h3 className={`text-base md:text-lg font-semibold ${colors.text.primary} mb-2`}>
                {searchQuery || filterStatus !== 'all' ? 'No matching tasks found' : 'No tasks yet'}
              </h3>
              <p className={`${colors.text.secondary} mb-4 text-sm md:text-base`}>
                {searchQuery || filterStatus !== 'all' 
                  ? 'Try adjusting your search or filter criteria' 
                  : 'Create your first task to get started'
                }
              </p>
              {(!searchQuery && filterStatus === 'all') && (
                <button
                  onClick={() => setAdd(true)}
                  className={`inline-flex items-center px-3 md:px-4 py-2 ${colors.button.primary} text-white rounded-lg transition-colors duration-200 font-medium text-sm md:text-base`}
                >
                  <Plus className="w-4 h-4 mr-2" />
                  Create Your First Task
                </button>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Add Task Modal/Form */}
      {add && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 md:p-4">
          <div className={`${colors.bg.secondary} rounded-xl md:rounded-2xl p-4 md:p-6 w-full max-w-sm md:max-w-md mx-4`}>
            <div className="flex justify-between items-center mb-3 md:mb-4">
              <h3 className={`text-base md:text-lg font-semibold ${colors.text.primary}`}>Create New Task</h3>
              <button
                onClick={() => setAdd(false)}
                className={`${colors.text.tertiary} hover:${colors.text.secondary} text-xl md:text-2xl`}
              >
                ×
              </button>
            </div>
            <AddTaskForm
              handleNewData={handleAddTask}
            />
          </div>
        </div>
      )}
    </div>
  );
};
