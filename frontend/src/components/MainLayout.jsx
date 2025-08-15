import React, { useState } from "react";
import Navbar from "./Navbar";
import { Outlet } from "react-router";
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import { useThemeContext } from "../contexts/ThemeContext";
import { LayoutGrid, BarChart3, LogOut, Moon, Sun, Menu, X } from 'lucide-react'

export const MainLayout = () => {
  const { colors, isDarkMode, toggleTheme } = useThemeContext();
  const { logout } = useAuthContext();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async(e) => {
    e.preventDefault();
    await logout();
    navigate('/Login')
  }

  const isActive = (path) => {
    return location.pathname === path;
  }

  const navItems = [
    { path: '/Home', icon: LayoutGrid, label: 'Dashboard', isActive: isActive('/Home') },
    { path: '/Stats', icon: BarChart3, label: 'Statistics', isActive: isActive('/Stats') },
  ];
  
  return (
    <div className={`flex min-h-screen ${colors.bg.primary}`}>
      {/* Desktop Sidebar */}
      <Navbar />
      
      {/* Mobile Navigation */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-50">
        <div className={`${colors.bg.secondary} ${colors.border.primary} border-b px-4 py-3`}>
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <div className="w-8 h-8 bg-white rounded-xl flex items-center justify-center mr-3 shadow-lg">
                <span className="text-gray-900 font-bold text-sm">S</span>
              </div>
              <h1 className={`text-lg font-bold tracking-tight ${colors.text.primary}`}>SkillVault</h1>
            </div>
            
            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg ${colors.text.secondary} hover:${colors.bg.tertiary} transition-colors duration-200`}
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
          
          {/* Mobile Menu */}
          {isMobileMenuOpen && (
            <div className="mt-4 pb-3 border-t border-gray-700 pt-4">
              <nav className="space-y-2">
                {navItems.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-3 py-2 rounded-lg transition-all duration-300 ${
                      item.isActive
                        ? `${isDarkMode ? 'bg-blue-600' : 'bg-white'} ${isDarkMode ? 'text-white' : 'text-gray-900'} shadow-lg`
                        : `${colors.text.secondary} hover:${colors.bg.tertiary} hover:${colors.text.primary}`
                    }`}
                  >
                    <item.icon className="w-5 h-5 mr-3" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                ))}
                
                {/* Theme Toggle */}
                <button
                  onClick={() => {
                    toggleTheme();
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center w-full px-3 py-2 ${colors.text.secondary} hover:${colors.bg.tertiary} hover:${colors.text.primary} rounded-lg transition-all duration-300`}
                >
                  {isDarkMode ? (
                    <Sun className="w-5 h-5 mr-3" />
                  ) : (
                    <Moon className="w-5 h-5 mr-3" />
                  )}
                  <span className="font-medium">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                </button>
                
                {/* Logout */}
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className={`flex items-center w-full px-3 py-2 ${colors.text.secondary} hover:${colors.bg.tertiary} hover:${colors.text.primary} rounded-lg transition-all duration-300`}
                >
                  <LogOut className="w-5 h-5 mr-3" />
                  <span className="font-medium">Logout</span>
                </button>
              </nav>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 md:ml-64 lg:ml-80 pt-16 md:pt-0">
        <main className="w-full">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
