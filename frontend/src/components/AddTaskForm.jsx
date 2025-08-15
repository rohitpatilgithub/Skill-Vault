import React, { useState } from "react";
import CompactDatePicker from "./CompactDatePicker";
import { useThemeContext } from "../contexts/ThemeContext";

const AddTaskForm = ({ handleNewData }) => {
  const { colors, isDarkMode } = useThemeContext();
  const [title, setTitle] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [status, setStatus] = useState("pending");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      await handleNewData({
        title,
        startDate,
        endDate,
        status,
      });
      
      // Clear form after successful submission
      setTitle("");
      setStartDate("");
      setEndDate("");
      setStatus("pending");
    } catch (error) {
      console.error("Error creating task:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3 md:space-y-4">
      <div>
        <label htmlFor="title" className={`block text-xs md:text-sm font-medium ${colors.text.secondary} mb-1 md:mb-2`}>
          Task Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          placeholder="Enter task title"
          onChange={(e) => setTitle(e.target.value)}
          className={`w-full px-3 md:px-4 py-2.5 md:py-3 border ${colors.border.input} rounded-md md:rounded-lg ${colors.background.input} ${colors.text.input} text-sm md:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200`}
          required
        />
      </div>

      <div className="grid grid-cols-1 gap-3 md:gap-4">
        <CompactDatePicker
          id="startDate"
          label="Start Date"
          value={startDate}
          onChange={setStartDate}
          min={new Date().toISOString().split('T')[0]}
          required
          placeholder="Select start date"
        />
        
        <CompactDatePicker
          id="endDate"
          label="End Date"
          value={endDate}
          onChange={setEndDate}
          min={startDate || new Date().toISOString().split('T')[0]}
          required
          placeholder="Select end date"
        />
      </div>

      <div>
        <label htmlFor="status" className={`block text-xs md:text-sm font-medium ${colors.text.secondary} mb-1 md:mb-2`}>
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={`w-full px-3 md:px-4 py-2.5 md:py-3 border ${colors.border.input} rounded-md md:rounded-lg ${colors.background.input} ${colors.text.input} text-sm md:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200`}
          style={{
            backgroundColor: isDarkMode ? '#374151' : '#ffffff',
            color: isDarkMode ? '#ffffff' : '#111827'
          }}
          required
        >
          <option 
            value="pending"
            style={{
              backgroundColor: isDarkMode ? '#374151' : '#ffffff',
              color: isDarkMode ? '#ffffff' : '#111827'
            }}
          >
            Pending
          </option>
          <option 
            value="in_progress"
            style={{
              backgroundColor: isDarkMode ? '#374151' : '#ffffff',
              color: isDarkMode ? '#ffffff' : '#111827'
            }}
          >
            In Progress
          </option>
          <option 
            value="completed"
            style={{
              backgroundColor: isDarkMode ? '#374151' : '#ffffff',
              color: isDarkMode ? '#ffffff' : '#111827'
            }}
          >
            Completed
          </option>
        </select>
      </div>

      <button 
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gray-900 text-white py-2.5 md:py-3 px-4 rounded-md md:rounded-lg hover:bg-gray-800 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 outline-none transition-colors duration-200 font-medium text-sm md:text-base disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Creating Task..." : "Create Task"}
      </button>
    </form>
  );
};

export default AddTaskForm;
