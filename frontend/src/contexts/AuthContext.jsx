import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(
    () => sessionStorage.getItem("token") || null
  );
  const [user, setUser] = useState(
    () => {
      const savedUser = sessionStorage.getItem("user");
      return savedUser ? JSON.parse(savedUser) : null;
    }
  );

  const login = (userToken, userData = null) => {
    setToken(userToken);
    sessionStorage.setItem("token", userToken);
    
    if (userData) {
      setUser(userData);
      sessionStorage.setItem("user", JSON.stringify(userData));
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("user");
  };

  const values = {
    token,
    user,
    login,
    logout
  };

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>;
};

export const useAuthContext = () => {
  return useContext(AuthContext);
};
