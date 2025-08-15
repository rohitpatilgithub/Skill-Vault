import React, { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

export const useThemeContext = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    // Default to system preference
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Update document class for global styling
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const theme = {
    isDarkMode,
    toggleTheme,
    colors: {
      // Background colors
      bg: {
        primary: isDarkMode ? 'bg-gray-900' : 'bg-gray-50',
        secondary: isDarkMode ? 'bg-gray-800' : 'bg-white',
        tertiary: isDarkMode ? 'bg-gray-700' : 'bg-gray-100',
      },
      // Background colors (alternative naming for consistency)
      background: {
        primary: isDarkMode ? 'bg-gray-900' : 'bg-gray-50',
        secondary: isDarkMode ? 'bg-gray-200' : 'bg-gray-200',
        card: isDarkMode ? 'bg-gray-800' : 'bg-white',
      },
      // Text colors
      text: {
        primary: isDarkMode ? 'text-white' : 'text-gray-900',
        secondary: isDarkMode ? 'text-gray-300' : 'text-gray-600',
        tertiary: isDarkMode ? 'text-gray-400' : 'text-gray-500',
      },
      // Border colors
      border: {
        primary: isDarkMode ? 'border-gray-700' : 'border-gray-300',
        secondary: isDarkMode ? 'border-gray-600' : 'border-gray-200',
        card: isDarkMode ? 'shadow-sm border-gray-700' : 'shadow-sm border border-gray-100',
      },
      // Button colors
      button: {
        primary: isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-900 hover:bg-gray-800',
        secondary: isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300',
      }
    }
  };

  return (
    <ThemeContext.Provider value={theme}>
      {children}
    </ThemeContext.Provider>
  );
};
