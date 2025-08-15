import React, { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useAuthContext } from '../contexts/AuthContext'
import { useThemeContext } from '../contexts/ThemeContext'
import { LayoutGrid, BarChart3, LogOut, Moon, Sun } from 'lucide-react'

const Navbar = () => {
    const { logout } = useAuthContext();
    const { isDarkMode, toggleTheme, colors } = useThemeContext();
    const navigate = useNavigate();
    const location = useLocation();
    const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);

    const handleLogout = async(e) => {
        e.preventDefault();
        setShowLogoutConfirm(true);
    }

    const confirmLogout = async () => {
        await logout();
        navigate('/');
        setShowLogoutConfirm(false);
    }

    const cancelLogout = () => {
        setShowLogoutConfirm(false);
    }

    const isActive = (path) => {
        return location.pathname === path;
    }

    const navItems = [
        { path: '/Home', icon: LayoutGrid, label: 'Dashboard', isActive: isActive('/Home') },
        { path: '/Stats', icon: BarChart3, label: 'Statistics', isActive: isActive('/Stats') },
    ];

    return (
        <div className="fixed left-0 top-0 h-full w-64 lg:w-80 p-3 lg:p-6 z-50 hidden md:block">
            <div className={`h-full ${colors.bg.secondary} text-white flex flex-col rounded-2xl lg:rounded-3xl shadow-2xl ${colors.border.primary} border`}>
                {/* Logo/Brand */}
                <div className="p-4 lg:p-8 border-b border-gray-700">
                    <div className="flex items-center">
                        <div className="w-8 h-8 lg:w-12 lg:h-12 bg-white rounded-xl lg:rounded-2xl flex items-center justify-center mr-2 lg:mr-4 shadow-lg">
                            <span className="text-gray-900 font-bold text-sm lg:text-xl">S</span>
                        </div>
                        <h1 className={`text-lg lg:text-2xl font-bold tracking-tight ${colors.text.primary}`}>SkillVault</h1>
                    </div>
                </div>

                {/* Navigation Items */}
                <nav className="flex-1 py-4 lg:py-8">
                    <ul className="space-y-2 lg:space-y-4 px-4 lg:px-8">
                        {navItems.map((item, index) => (
                            <li key={index}>
                                <Link
                                    to={item.path}
                                    className={`flex items-center px-3 lg:px-6 py-3 lg:py-4 rounded-xl lg:rounded-2xl transition-all duration-300 group ${
                                        item.isActive
                                            ? `${isDarkMode ? 'bg-blue-600' : 'bg-white'} ${isDarkMode ? 'text-white' : 'text-gray-900'} shadow-xl transform scale-[1.02]`
                                            : `${colors.text.secondary} hover:${colors.bg.tertiary} hover:${colors.text.primary} hover:transform hover:scale-[1.02] hover:shadow-lg`
                                    }`}
                                >
                                    <item.icon className={`w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-4 transition-transform duration-300 ${
                                        item.isActive ? (isDarkMode ? 'text-white' : 'text-gray-900') : 'group-hover:scale-110'
                                    }`} />
                                    <span className="font-semibold text-sm lg:text-lg">{item.label}</span>
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Theme Toggle Button */}
                <div className="px-4 lg:px-8 py-2 lg:py-4">
                    <button
                        onClick={toggleTheme}
                        className={`flex items-center w-full px-3 lg:px-6 py-3 lg:py-4 ${colors.text.secondary} hover:${colors.bg.tertiary} hover:${colors.text.primary} rounded-xl lg:rounded-2xl transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-lg group`}
                    >
                        {isDarkMode ? (
                            <Sun className="w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-4 group-hover:scale-110 transition-transform duration-300" />
                        ) : (
                            <Moon className="w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-4 group-hover:scale-110 transition-transform duration-300" />
                        )}
                        <span className="font-semibold text-sm lg:text-lg">{isDarkMode ? 'Light Mode' : 'Dark Mode'}</span>
                    </button>
                </div>

                {/* Logout Button */}
                <div className="p-4 lg:p-8 border-t border-gray-700">
                    <button
                        onClick={handleLogout}
                        className={`flex items-center w-full px-3 lg:px-6 py-3 lg:py-4 ${colors.text.secondary} hover:${colors.bg.tertiary} hover:${colors.text.primary} rounded-xl lg:rounded-2xl transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-lg group`}
                    >
                        <LogOut className="w-5 h-5 lg:w-6 lg:h-6 mr-2 lg:mr-4 group-hover:scale-110 transition-transform duration-300" />
                        <span className="font-semibold text-sm lg:text-lg">Logout</span>
                    </button>
                </div>
            </div>

            {/* Logout Confirmation Modal */}
            {showLogoutConfirm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999] p-4">
                    <div className={`${colors.bg.secondary} rounded-xl md:rounded-2xl p-6 w-full max-w-sm mx-4 ${colors.border.primary} border`}>
                        <div className="text-center">
                            <div className={`w-12 h-12 mx-auto mb-4 ${isDarkMode ? 'bg-red-900/30' : 'bg-red-100'} rounded-full flex items-center justify-center`}>
                                <LogOut className={`w-6 h-6 ${isDarkMode ? 'text-red-400' : 'text-red-600'}`} />
                            </div>
                            
                            <h3 className={`text-lg font-semibold mb-2 ${colors.text.primary}`}>Confirm Logout</h3>
                            <p className={`${colors.text.secondary} mb-6 text-sm`}>
                                Are you sure you want to logout? You'll need to sign in again to access your tasks.
                            </p>
                            
                            <div className="flex space-x-3">
                                <button
                                    onClick={cancelLogout}
                                    className={`flex-1 px-4 py-2.5 ${colors.bg.tertiary} ${colors.text.secondary} rounded-lg hover:${colors.text.primary} transition-colors duration-200 font-medium text-sm`}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmLogout}
                                    className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors duration-200 font-medium text-sm"
                                >
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Navbar
