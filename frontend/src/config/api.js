// API Configuration
const API_CONFIG = {
  // Base URLs
  BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  USERS_BASE: import.meta.env.VITE_API_USERS_BASE || 'http://localhost:3000/api/users',
  TASKS_BASE: import.meta.env.VITE_API_TASKS_BASE || 'http://localhost:3000/api/tasks',
  
  // User endpoints
  USER: {
    SIGNUP: import.meta.env.VITE_API_USER_SIGNUP || 'http://localhost:3000/api/users/signup',
    LOGIN: import.meta.env.VITE_API_USER_LOGIN || 'http://localhost:3000/api/users/login',
    PROFILE: `${import.meta.env.VITE_API_USERS_BASE || 'http://localhost:3000/api/users'}/profile`
  },
  
  // Task endpoints
  TASK: {
    GET_ALL: import.meta.env.VITE_API_TASKS || 'http://localhost:3000/api/tasks',
    CREATE: import.meta.env.VITE_API_TASKS || 'http://localhost:3000/api/tasks',
    UPDATE: (id) => `${import.meta.env.VITE_API_TASKS_BASE || 'http://localhost:3000/api/tasks'}/${id}`,
    DELETE: (id) => `${import.meta.env.VITE_API_TASKS_BASE || 'http://localhost:3000/api/tasks'}/${id}`,
    FILTERED: import.meta.env.VITE_API_TASKS_FILTERED || 'http://localhost:3000/api/tasks/filtered'
  }
};

export default API_CONFIG;
