import React, { useState, useEffect } from "react";
import CompactDatePicker from "./CompactDatePicker";
import { useThemeContext } from "../contexts/ThemeContext";

// We will pass the new Data to parent after edit icon clicked
const EditTaskForm = ({ task, handleSubmitData }) => {
  const { colors } = useThemeContext();
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("");

  // Pre-populate form with existing task data
  useEffect(() => {
    if (task) {
      setTitle(task.title || "");
      setStartDate(task.startDate || "");
      setEndDate(task.endDate || "");
      setStatus(task.status || "");
    }
  }, [task]);

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSubmitData({
      title,
      startDate,
      endDate,
      status,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
      <div>
        <label htmlFor="edit-title" className={`block text-xs md:text-sm font-medium ${colors.text.secondary} mb-1 md:mb-2`}>
          Task Title
        </label>
        <input
          id="edit-title"
          type="text"
          value={title}
          placeholder="Enter task title"
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full px-3 md:px-4 py-2.5 md:py-3 border ${colors.border.input} rounded-md md:rounded-lg ${colors.background.input} ${colors.text.primary} text-sm md:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200`}
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-3 md:gap-4">
        <CompactDatePicker
          id="edit-startDate"
          label="Start Date"
          value={startDate}
          onChange={setStartDate}
          required
          placeholder="Select start date"
        />
        
        <CompactDatePicker
          id="edit-endDate"
          label="End Date"
          value={endDate}
          onChange={setEndDate}
          min={startDate}
          required
          placeholder="Select end date"
        />
      </div>

      <div>
        <label htmlFor="edit-status" className={`block text-xs md:text-sm font-medium ${colors.text.secondary} mb-1 md:mb-2`}>
          Status
        </label>
        <select
          id="edit-status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={`w-full px-3 md:px-4 py-2.5 md:py-3 border ${colors.border.input} rounded-md md:rounded-lg ${colors.background.input} ${colors.text.primary} text-sm md:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200`}
          required
        >
          <option value="pending">Pending</option>
          <option value="in_progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      <button 
        type="submit"
        className="w-full bg-gray-900 text-white py-2.5 md:py-3 px-4 rounded-md md:rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 outline-none transition-colors duration-200 font-medium text-sm md:text-base"
      >
        Update Task
      </button>
    </form>
  );
};

export default EditTaskForm;
