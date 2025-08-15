import React from "react";
import Login from "./pages/Login";
import Signup from "./pages/SignupUser";
import ProtectedRoutes from "./components/ProtectedRoutes";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Home } from "./pages/Home";
import NotFound from "./pages/NotFound";
import Stats from "./pages/Stats";
import { MainLayout } from './components/MainLayout'
import SkillVaultLanding from "./components/LandingPage";
import { TaskProvider } from "./contexts/TaskContext";
import { ThemeProvider } from "./contexts/ThemeContext";
 
const App = () => {
  return (
    <div>
      <BrowserRouter>
        <ThemeProvider>
          <TaskProvider>
            <Routes>
              <Route path="/" element={<SkillVaultLanding />}></Route>
              <Route path="/signup" element={<Signup />}></Route>
              <Route path="/Login" element={<Login />}></Route>
              <Route element={<MainLayout />}>
              <Route
                path="/Home"
                element={
                  <ProtectedRoutes>
                    <Home />
                  </ProtectedRoutes>
                }
              ></Route>
              <Route
                path="/Stats"
                element={
                  <ProtectedRoutes>
                    <Stats />
                  </ProtectedRoutes>
                }
              ></Route>
            </Route>
            <Route path="/LandingPage" element={<SkillVaultLanding />}></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Routes>
          </TaskProvider>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
};

export default App;
