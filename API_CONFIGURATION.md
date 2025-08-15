# API Configuration Documentation

## 🔧 **Centralized API Configuration Setup**

This document outlines the centralized API configuration system implemented for the SkillVault application.

### 📁 **File Structure**
```
frontend/
├── .env                     ← Environment variables
├── src/
│   ├── config/
│   │   └── api.js          ← Centralized API configuration
│   ├── contexts/
│   │   ├── TaskContext.jsx ← Updated to use API_CONFIG
│   │   └── AuthContext.jsx
│   └── pages/
│       ├── Login.jsx       ← Updated to use API_CONFIG
│       ├── Signup.jsx      ← Updated to use API_CONFIG
│       └── SignupUser.jsx  ← Updated to use API_CONFIG
```

### 🌍 **Environment Variables (.env)**
```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3000/api

# Specific API Endpoints
VITE_API_USERS_BASE=http://localhost:3000/api/users
VITE_API_TASKS_BASE=http://localhost:3000/api/tasks

# Full endpoint URLs for convenience
VITE_API_USER_SIGNUP=http://localhost:3000/api/users/signup
VITE_API_USER_LOGIN=http://localhost:3000/api/users/login
VITE_API_TASKS=http://localhost:3000/api/tasks
VITE_API_TASKS_FILTERED=http://localhost:3000/api/tasks/filtered
```

### ⚙️ **API Configuration (api.js)**
```javascript
// Usage Examples:
import API_CONFIG from '../config/api';

// User endpoints
API_CONFIG.USER.LOGIN    // http://localhost:3000/api/users/login
API_CONFIG.USER.SIGNUP   // http://localhost:3000/api/users/signup

// Task endpoints
API_CONFIG.TASK.GET_ALL  // http://localhost:3000/api/tasks
API_CONFIG.TASK.CREATE   // http://localhost:3000/api/tasks
API_CONFIG.TASK.UPDATE(id) // http://localhost:3000/api/tasks/{id}
API_CONFIG.TASK.DELETE(id) // http://localhost:3000/api/tasks/{id}
```

### 🔄 **Updated Components**

#### ✅ **TaskContext.jsx**
- ✅ `fetchTasks()` - Uses `API_CONFIG.TASK.GET_ALL`
- ✅ `addTask()` - Uses `API_CONFIG.TASK.CREATE`
- ✅ `updateTask()` - Uses `API_CONFIG.TASK.UPDATE(id)`
- ✅ `deleteTask()` - Uses `API_CONFIG.TASK.DELETE(id)`

#### ✅ **Login.jsx**
- ✅ Login API call - Uses `API_CONFIG.USER.LOGIN`

#### ✅ **Signup.jsx**
- ✅ Signup API call - Uses `API_CONFIG.USER.SIGNUP`

#### ✅ **SignupUser.jsx**
- ✅ Signup API call - Uses `API_CONFIG.USER.SIGNUP`

### 🚀 **Benefits for Deployment**

1. **Easy Environment Switching**: Just change `.env` values for different environments
2. **Single Source of Truth**: All API URLs managed in one place
3. **Deployment Ready**: No hardcoded localhost URLs
4. **Maintainable**: Easy to update API endpoints

### 📝 **Deployment Checklist**

#### For Production Deployment:
1. **Update .env for production:**
   ```env
   VITE_API_BASE_URL=https://your-production-api.com/api
   VITE_API_USERS_BASE=https://your-production-api.com/api/users
   VITE_API_TASKS_BASE=https://your-production-api.com/api/tasks
   ```

2. **Ensure environment variables are loaded** in your deployment platform

3. **Test API endpoints** before going live

### 🔧 **Development vs Production**

| Environment | Base URL |
|-------------|----------|
| Development | `http://localhost:3000/api` |
| Production  | `https://your-domain.com/api` |

**Note**: The API_CONFIG automatically falls back to localhost URLs if environment variables are not set.

---

**Status**: ✅ **Complete** - All API calls now use centralized configuration
**Ready for**: 🚀 **Production Deployment**
