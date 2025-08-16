# 🎯 SkillVault - Task Management Application

**SkillVault** is a full-stack task management application built with the MERN stack, featuring a modern React frontend with Tailwind CSS and a robust Node.js/Express backend with MongoDB integration.
## 🚀 Live Demo

**[View Live Application](https://skill-vault-ten.vercel.app/)**

<br>

<p align="center">
  <img 
    src="https://github.com/user-attachments/assets/38b7273c-b8ca-45ba-84cf-ecc35f8daf5c", 
    width="700" 
    style="border-radius:10px; margin-top:20px; margin-bottom:20px;" 
  />
</p>

<br>

---
## 🌟 Features

- ✅ **User Authentication** - Secure JWT-based login/signup system
- 📋 **Task Management** - Create, edit, delete, and track tasks
- 📊 **Statistics Dashboard** - Visual insights with Chart.js
- 🌙 **Dark/Light Theme** - Toggle between themes with persistence
- 📱 **Responsive Design** - Mobile-first approach with Tailwind CSS
- 🔒 **Protected Routes** - Secure authentication-based navigation
- ⚡ **Real-time Updates** - Seamless task operations with context API

## 🛠️ Tech Stack

### Frontend
- **Framework**: React 19.1.1 with Vite
- **Styling**: Tailwind CSS 4.1.11
- **Icons**: Lucide React
- **Charts**: Chart.js & React-Chartjs-2
- **Routing**: React Router DOM 7.8.0
- **Build Tool**: Vite 7.1.0

### Backend
- **Runtime**: Node.js with Express 5.1.0
- **Database**: MongoDB with Mongoose 8.16.5
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Password Hashing**: bcrypt 6.0.0
- **CORS**: cors 2.8.5
- **Environment**: dotenv 17.2.1

## 📁 Project Structure

### Backend (`/back`)
```
back/
├── server.js                 # Express server entry point
├── package.json              # Backend dependencies
├── .gitignore               # Git ignore patterns
│
├── config/
│   └── db.js                # MongoDB connection configuration
│
├── controllers/
│   ├── user.controller.js   # User authentication logic
│   └── task.controller.js   # Task CRUD operations
│
├── middlewares/
│   └── auth.middleware.js   # JWT authentication middleware
│
├── models/
│   ├── user.model.js        # User schema definition
│   └── task.model.js        # Task schema definition
│
├── routes/
│   ├── UserR/
│   │   └── user.routes.js   # User authentication routes
│   └── TaskR/
│       └── task.routes.js   # Task management routes
│
└── utils/
    └── task.utils.js        # Task utility functions
```

### Frontend (`/frontend`)
```
frontend/
├── index.html               # HTML template
├── package.json             # Frontend dependencies
├── vite.config.js          # Vite configuration
├── eslint.config.js        # ESLint configuration
├── .env                    # Environment variables
├── .gitignore              # Git ignore patterns
│
├── public/
│   └── vite.svg            # Vite logo
│
└── src/
    ├── main.jsx            # React app entry point
    ├── App.jsx             # Main app component with routing
    ├── App.css             # Global styles
    ├── index.css           # Tailwind imports
    │
    ├── assets/             # Static assets
    │   ├── react.svg
    │   ├── try.png
    │   └── bg-image-1.jpeg
    │
    ├── components/         # Reusable components
    │   ├── MainLayout.jsx          # Main app layout
    │   ├── Navbar.jsx              # Navigation sidebar
    │   ├── LandingPage.jsx         # Landing page component
    │   ├── TasksCard.jsx           # Individual task card
    │   ├── AddTaskForm.jsx         # Create task form
    │   ├── EditTaskForm.jsx        # Edit task form
    │   ├── CompactDatePicker.jsx   # Date selection component
    │   ├── CustomDatePicker.jsx    # Alternative date picker
    │   ├── ThemeToggle.jsx         # Theme switcher
    │   └── ProtectedRoutes.jsx     # Route protection
    │
    ├── contexts/           # React contexts
    │   ├── AuthContext.jsx         # Authentication state
    │   ├── TaskContext.jsx         # Task management state
    │   └── ThemeContext.jsx        # Theme state management
    │
    ├── pages/              # Page components
    │   ├── Home.jsx                # Dashboard page
    │   ├── Stats.jsx               # Statistics page
    │   ├── Login.jsx               # Login page
    │   ├── SignupUser.jsx          # User registration
    │   ├── Signup.jsx              # Alternative signup
    │   └── NotFound.jsx            # 404 error page
    │
    └── config/             # Configuration files
        └── api.js                  # API endpoint configuration
```

## 🔐 Authentication System

### JWT-Based Authentication
- **Token Storage**: Session storage for security
- **Protected Routes**: Middleware-based route protection
- **Auto-logout**: Automatic session cleanup
- **Secure Headers**: JWT tokens in authorization headers

### Authentication Flow
1. User registers/logs in → JWT token generated
2. Token stored in session storage (not localStorage)
3. Token sent with every API request via headers
4. Middleware validates token on protected routes
5. Invalid/expired tokens redirect to login

## ⚠️ Current Authentication Flaws

### Session Storage vs Local Storage
**Current Implementation**: Uses `sessionStorage`
**Potential Issues**:
- ❌ **Session-only persistence**: Tokens lost on tab close
- ❌ **No refresh token mechanism**: Users must re-login frequently
- ❌ **XSS vulnerability**: JavaScript-accessible storage

**Recommended Improvements**:
- ✅ **HTTP-only cookies**: Server-controlled, XSS-resistant
- ✅ **Refresh token rotation**: Long-term session management
- ✅ **Token expiration handling**: Automatic renewal
- ✅ **Secure cookie flags**: httpOnly, secure, sameSite

### Security Enhancements Needed
```javascript
// Current vulnerable approach
sessionStorage.setItem("token", userToken);

// Recommended secure approach
// HTTP-only cookie with refresh token strategy
```

## 🌍 Environment Configuration

### Frontend (.env)
```env
# API Configuration
VITE_API_BASE_URL=https://skill-vault-alsh.onrender.com

# Specific API Endpoints
VITE_API_USERS_BASE=https://skill-vault-alsh.onrender.com/api/users
VITE_API_TASKS_BASE=https://skill-vault-alsh.onrender.com/api/tasks

# Full endpoint URLs for convenience
VITE_API_USER_SIGNUP=https://skill-vault-alsh.onrender.com/api/users/signup
VITE_API_USER_LOGIN=https://skill-vault-alsh.onrender.com/api/users/login
VITE_API_TASKS=https://skill-vault-alsh.onrender.com/api/tasks
VITE_API_TASKS_FILTERED=https://skill-vault-alsh.onrender.com/api/tasks/filtered
```

### Backend Environment Variables
```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
PORT=5000
NODE_ENV=production
```

## 🚀 Deployment Guide

### Backend Deployment on Render

1. **Repository Setup**
   ```bash
   git add .
   git commit -m "Prepare for deployment"
   git push origin main
   ```

2. **Render Configuration**
   - Connect GitHub repository
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Node Version**: 18+

3. **Environment Variables**
   ```
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/skillvault
   JWT_SECRET=your-super-secret-jwt-key
   PORT=10000
   NODE_ENV=production
   ```

4. **Package.json Scripts**
   ```json
   {
     "scripts": {
       "start": "node server.js",
       "start:dev": "nodemon server.js"
     }
   }
   ```

### Frontend Deployment on Vercel

1. **Vercel Configuration**
   ```bash
   npm i -g vercel
   vercel login
   vercel --prod
   ```

2. **Build Settings**
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`

3. **Environment Variables**
   ```
   VITE_API_BASE_URL=https://your-render-backend.onrender.com
   VITE_API_USERS_BASE=https://your-render-backend.onrender.com/api/users
   VITE_API_TASKS_BASE=https://your-render-backend.onrender.com/api/tasks
   ```

4. **Routing Configuration** (`vercel.json`)
   ```json
   {
     "rewrites": [
       { "source": "/(.*)", "destination": "/index.html" }
     ]
   }
   ```

## 🏃‍♂️ Local Development

### Backend Setup
```bash
cd back
npm install
npm run start:dev
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

### Database Setup
1. Install MongoDB locally or use MongoDB Atlas
2. Update connection string in backend `.env`
3. Database will auto-create on first run

## 📊 API Endpoints

### Authentication
- `POST /api/users/signup` - User registration
- `POST /api/users/login` - User login

### Tasks (Protected)
- `GET /api/tasks` - Fetch all user tasks
- `POST /api/tasks` - Create new task
- `PUT /api/tasks/:id` - Update task
- `DELETE /api/tasks/:id` - Delete task
- `GET /api/tasks/filtered` - Filter tasks by status

## 🎨 Theme System

### Features
- **Dark/Light Mode Toggle**: Persistent theme selection
- **System Preference Detection**: Respects OS theme settings
- **Smooth Transitions**: Animated theme switching
- **Comprehensive Color System**: Theme-aware component styling

### Implementation
```javascript
// Theme Context with localStorage persistence
const [isDarkMode, setIsDarkMode] = useState(() => {
  const savedTheme = localStorage.getItem('theme');
  return savedTheme ? savedTheme === 'dark' : true; // Default dark
});
```

## 🔧 Future Improvements

### Security
- [ ] Implement HTTP-only cookies for token storage
- [ ] Add refresh token mechanism
- [ ] Implement rate limiting
- [ ] Add input validation and sanitization
- [ ] CSRF protection

### Features
- [ ] Task categories and tags
- [ ] Task sharing and collaboration
- [ ] Email notifications
- [ ] File attachments
- [ ] Task templates
- [ ] Advanced filtering and search

### Performance
- [ ] Implement pagination for tasks
- [ ] Add caching mechanisms
- [ ] Optimize bundle size
- [ ] Add service worker for offline functionality

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**Rohit Patil**
- GitHub: [@rohitpatilgithub](https://github.com/rohitpatilgithub)
- Repository: [Skill-Vault](https://github.com/rohitpatilgithub/Skill-Vault)

---

**⭐ Star this repository if you found it helpful!**

