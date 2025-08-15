import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { useThemeContext } from '../contexts/ThemeContext';

const CustomDatePicker = ({ value, onChange, label, id, min, required, placeholder = "Select date" }) => {
  const { colors } = useThemeContext();
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const dropdownRef = useRef(null);

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const dayNames = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatDisplayDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatValueDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  };

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const firstDayOfWeek = firstDay.getDay();
    const daysInMonth = lastDay.getDate();

    const days = [];

    // Previous month's trailing days
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({
        date: prevDate,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isDisabled: true
      });
    }

    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(year, month, day);
      const dateString = formatValueDate(date);
      const today = new Date();
      const minDate = min ? new Date(min) : null;

      days.push({
        date,
        isCurrentMonth: true,
        isToday: date.toDateString() === today.toDateString(),
        isSelected: value === dateString,
        isDisabled: minDate && date < minDate
      });
    }

    return days;
  };

  const handleDateSelect = (dayInfo) => {
    if (dayInfo.isDisabled || !dayInfo.isCurrentMonth) return;
    
    const dateString = formatValueDate(dayInfo.date);
    onChange(dateString);
    setIsOpen(false);
  };

  const navigateMonth = (direction) => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + direction);
      return newDate;
    });
  };

  const goToToday = () => {
    const today = new Date();
    setCurrentDate(today);
    const todayString = formatValueDate(today);
    onChange(todayString);
    setIsOpen(false);
  };

  const clearDate = () => {
    onChange('');
    setIsOpen(false);
  };

  const calendarDays = getDaysInMonth(currentDate);

  return (
    <div className="relative" ref={dropdownRef}>
      <label htmlFor={id} className={`block text-xs md:text-sm font-medium ${colors.text.secondary} mb-1 md:mb-2`}>
        {label}
      </label>
      
      <div className="relative">
        <input
          id={id}
          type="text"
          value={formatDisplayDate(value)}
          placeholder={placeholder}
          onClick={() => setIsOpen(!isOpen)}
          readOnly
          className={`w-full px-3 md:px-4 py-2.5 md:py-3 border ${colors.border.input} rounded-md md:rounded-lg ${colors.background.input} ${colors.text.primary} text-sm md:text-base focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 hover:border-gray-300 cursor-pointer`}
          required={required}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <Calendar className="w-3 h-3 md:w-4 md:h-4 text-gray-400" />
        </div>
      </div>

      {isOpen && (
        <div className={`absolute z-50 mt-1 w-56 md:w-64 ${colors.background.card} rounded-md md:rounded-lg shadow-lg border ${colors.border.card} p-2 md:p-3`}>
          {/* Compact Header */}
          <div className="flex items-center justify-between mb-2 md:mb-3">
            <button
              type="button"
              onClick={() => navigateMonth(-1)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronLeft className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />
            </button>
            
            <span className={`text-xs md:text-sm font-semibold ${colors.text.primary}`}>
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </span>
            
            <button
              type="button"
              onClick={() => navigateMonth(1)}
              className="p-1 hover:bg-gray-100 rounded transition-colors"
            >
              <ChevronRight className="w-3 h-3 md:w-4 md:h-4 text-gray-600" />
            </button>
          </div>

          {/* Compact Days Header */}
          <div className="grid grid-cols-7 gap-0.5 md:gap-1 mb-1">
            {dayNames.map(day => (
              <div key={day} className={`text-center text-xs font-medium ${colors.text.tertiary} py-1`}>
                {day}
              </div>
            ))}
          </div>

          {/* Compact Calendar Grid */}
          <div className="grid grid-cols-7 gap-0.5 md:gap-1">
            {calendarDays.map((dayInfo, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleDateSelect(dayInfo)}
                disabled={dayInfo.isDisabled}
                className={`
                  h-6 md:h-8 text-xs rounded transition-all duration-150 
                  ${dayInfo.isCurrentMonth ? colors.text.primary : 'text-gray-300'}
                  ${dayInfo.isToday ? 'bg-blue-100 text-blue-700 font-semibold' : ''}
                  ${dayInfo.isSelected ? 'bg-blue-600 text-white font-semibold' : ''}
                  ${dayInfo.isDisabled ? 'cursor-not-allowed opacity-40' : 'hover:bg-gray-100 cursor-pointer'}
                  ${dayInfo.isSelected ? 'hover:bg-blue-700' : ''}
                `}
              >
                {dayInfo.date.getDate()}
              </button>
            ))}
          </div>

          {/* Compact Footer */}
          <div className="flex justify-between mt-2 pt-2 border-t border-gray-100">
            <button
              type="button"
              onClick={clearDate}
              className={`text-xs ${colors.text.tertiary} hover:${colors.text.secondary} transition-colors px-2 py-1`}
            >
              Clear
            </button>
            <button
              type="button"
              onClick={goToToday}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium transition-colors px-2 py-1"
            >
              Today
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomDatePicker;
