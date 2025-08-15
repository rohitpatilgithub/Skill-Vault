import React, { useState } from "react";
import EditTaskForm from "./EditTaskForm";
import { useTaskContext } from "../contexts/TaskContext";
import { useThemeContext } from "../contexts/ThemeContext";
import { Calendar, Clock, Edit3, Trash2, CheckCircle2 } from 'lucide-react';

const TasksCard = ({ task }) => {
  const [edit, setEdit] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const { updateTask, deleteTask } = useTaskContext();
  const { colors, isDarkMode } = useThemeContext();

  const handleEdit = async (newData) => {
    try {
      // Merge unchanged fields (like _id and status) with new data
      await updateTask({ ...task, ...newData });
      setEdit(false);
    } catch (error) {
      console.log("Error updating task", error);
    }
  };

  const handleDelete = async () => {
    setShowDeleteConfirm(true);
  };

  const confirmDelete = async () => {
    try {
      await deleteTask(task._id);
      setShowDeleteConfirm(false);
    } catch (error) {
      console.log("Error deleting task", error);
      setShowDeleteConfirm(false);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in_progress':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <>
      <div className={`${colors.background.card} p-4 md:p-6 rounded-xl md:rounded-2xl ${colors.border.card} hover:shadow-md transition-shadow duration-200`}>
        {/* Task Header */}
        <div className="flex justify-between items-start mb-3 md:mb-4">
          <h3 className={`text-base md:text-lg font-semibold ${colors.text.primary} line-clamp-2 pr-2`}>{task.title}</h3>
          <div className="flex space-x-1 md:space-x-2 flex-shrink-0">
            <button
              onClick={() => setEdit(!edit)}
              className={`p-1.5 md:p-2 ${colors.text.tertiary} hover:text-blue-600 ${isDarkMode ? 'hover:bg-blue-900/30' : 'hover:bg-blue-50'} rounded-md md:rounded-lg transition-colors duration-200`}
            >
              <Edit3 className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
            <button
              onClick={handleDelete}
              className={`p-1.5 md:p-2 ${colors.text.tertiary} hover:text-red-600 ${isDarkMode ? 'hover:bg-red-900/30' : 'hover:bg-red-50'} rounded-md md:rounded-lg transition-colors duration-200`}
            >
              <Trash2 className="w-3.5 h-3.5 md:w-4 md:h-4" />
            </button>
          </div>
        </div>

        {/* Status Badge */}
        <div className="mb-3 md:mb-4">
          <span className={`inline-flex items-center px-2 md:px-3 py-1 rounded-full text-xs font-medium ${getStatusBadge(task.status)}`}>
            {task.status === 'completed' && <CheckCircle2 className="w-3 h-3 mr-1" />}
            {task.status === 'in_progress' && <Clock className="w-3 h-3 mr-1" />}
            {task.status.replace('_', ' ').toUpperCase()}
          </span>
        </div>

        {/* Dates */}
        <div className="space-y-1.5 md:space-y-2">
          <div className={`flex items-center text-xs md:text-sm ${colors.text.secondary}`}>
            <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" />
            <span className="truncate">Start: {formatDate(task.startDate)}</span>
          </div>
          <div className={`flex items-center text-xs md:text-sm ${colors.text.secondary}`}>
            <Calendar className="w-3 h-3 md:w-4 md:h-4 mr-2 flex-shrink-0" />
            <span className="truncate">End: {formatDate(task.endDate)}</span>
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {edit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 md:p-4">
          <div className={`${colors.background.card} rounded-xl md:rounded-2xl p-4 md:p-6 w-full max-w-sm md:max-w-md mx-4`}>
            <div className="flex justify-between items-center mb-3 md:mb-4">
              <h3 className={`text-base md:text-lg font-semibold ${colors.text.primary}`}>Edit Task</h3>
              <button
                onClick={() => setEdit(false)}
                className={`${colors.text.tertiary} hover:${colors.text.secondary} text-xl md:text-2xl`}
              >
                ×
              </button>
            </div>
            <EditTaskForm
              task={task}
              handleSubmitData={handleEdit}
            />
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-3 md:p-4">
          <div className={`${colors.background.card} rounded-xl md:rounded-2xl p-4 md:p-6 w-full max-w-sm md:max-w-md mx-4 border ${colors.border.card}`}>
            <div className="text-center">
              <div className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'bg-red-900/30' : 'bg-red-100'} rounded-full flex items-center justify-center`}>
                <Trash2 className={`w-6 h-6 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
              </div>
              
              <h3 className={`text-lg font-semibold mb-2 ${colors.text.primary}`}>Delete Task</h3>
              <p className={`${colors.text.secondary} mb-2 text-sm`}>
                Are you sure you want to delete this task?
              </p>
              <div className={`font-medium mb-4 text-sm ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'} p-3 rounded-lg border-l-4 ${isDarkMode ? 'border-red-400' : 'border-red-500'}`}>
                <div className="flex items-start space-x-2">
                  <Calendar className={`w-4 h-4 ${isDarkMode ? 'text-red-400' : 'text-red-500'} mt-0.5 flex-shrink-0`} />
                  <div className="text-left">
                    <p className={`font-semibold ${colors.text.primary}`}>"{task.title}"</p>
                    <p className={`${colors.text.secondary} text-xs mt-1`}>
                      {new Date(task.startDate).toLocaleDateString()} - {new Date(task.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
              <p className={`${colors.text.tertiary} mb-6 text-xs`}>
                ⚠️ This action cannot be undone.
              </p>
              
              <div className="flex space-x-3">
                <button
                  onClick={cancelDelete}
                  className={`flex-1 px-4 py-2.5 ${isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-100 hover:bg-gray-200'} ${colors.text.primary} rounded-lg transition-colors duration-200 font-medium text-sm border ${colors.border.secondary}`}
                >
                  Cancel
                </button>
                <button
                  onClick={confirmDelete}
                  className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium text-sm flex items-center justify-center space-x-2"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TasksCard;
