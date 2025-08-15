import React, { useState, useRef, useEffect } from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

const CustomDatePicker = ({ value, onChange, label, id, min, required, placeholder = "Select date" }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [dropdownPosition, setDropdownPosition] = useState('bottom');
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const calculateDropdownPosition = () => {
    if (!inputRef.current) return;
    
    const inputRect = inputRef.current.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    const windowWidth = window.innerWidth;
    const dropdownHeight = 400; // Approximate height of calendar
    const dropdownWidth = 320; // Width of calendar
    
    // Check if dropdown fits below input
    const spaceBelow = windowHeight - inputRect.bottom;
    const spaceAbove = inputRect.top;
    
    // Check horizontal positioning
    const spaceRight = windowWidth - inputRect.left;
    
    // Determine vertical position
    if (spaceBelow >= dropdownHeight) {
      setDropdownPosition('bottom');
    } else if (spaceAbove >= dropdownHeight) {
      setDropdownPosition('top');
    } else {
      setDropdownPosition('bottom'); // Default to bottom if neither fits well
    }
  };

  const handleToggleCalendar = () => {
    if (!isOpen) {
      calculateDropdownPosition();
    }
    setIsOpen(!isOpen);
  };

  const formatDisplayDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
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

    // Next month's leading days
    const totalCells = Math.ceil(days.length / 7) * 7;
    for (let day = 1; days.length < totalCells; day++) {
      const nextDate = new Date(year, month + 1, day);
      days.push({
        date: nextDate,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isDisabled: true
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

  const days = getDaysInMonth(currentDate);

  return (
    <div className="relative" ref={dropdownRef}>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      
      <div className="relative">
        <input
          ref={inputRef}
          id={id}
          type="text"
          value={formatDisplayDate(value)}
          placeholder={placeholder}
          onClick={handleToggleCalendar}
          readOnly
          className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-colors duration-200 bg-white hover:border-gray-300 cursor-pointer"
          required={required}
        />
        <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
          <Calendar className="w-5 h-5 text-gray-400" />
        </div>
      </div>

      {isOpen && (
        <div className={`absolute z-50 bg-white rounded-xl shadow-2xl border border-gray-100 p-4 w-full max-w-xs sm:max-w-sm md:w-80 ${
          dropdownPosition === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
        } left-0 right-0 mx-auto`}>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() => navigateMonth(-1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronLeft className="w-4 h-4 text-gray-600" />
            </button>
            
            <h3 className="text-lg font-semibold text-gray-900">
              {months[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h3>
            
            <button
              type="button"
              onClick={() => navigateMonth(1)}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <ChevronRight className="w-4 h-4 text-gray-600" />
            </button>
          </div>

          {/* Days of week header */}
          <div className="grid grid-cols-7 gap-1 mb-2">
            {dayNames.map(day => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar grid */}
          <div className="grid grid-cols-7 gap-1">
            {days.map((dayInfo, index) => (
              <button
                key={index}
                type="button"
                onClick={() => handleDateSelect(dayInfo)}
                disabled={dayInfo.isDisabled}
                className={`
                  p-2 text-sm rounded-lg transition-all duration-200 
                  ${dayInfo.isCurrentMonth ? 'text-gray-900' : 'text-gray-300'}
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

          {/* Footer */}
          <div className="flex justify-between mt-4 pt-3 border-t border-gray-100">
            <button
              type="button"
              onClick={clearDate}
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
            >
              Clear
            </button>
            <button
              type="button"
              onClick={goToToday}
              className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors"
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
