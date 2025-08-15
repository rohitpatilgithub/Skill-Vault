import React, { createContext, useContext, useState, useEffect } from 'react';
import { useAuthContext } from './AuthContext';

const TaskContext = createContext();

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [userTasks, setUserTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { token } = useAuthContext();

  useEffect(() => {
    if (token) {
      fetchTasks();
    }
  }, [token]);

  const fetchTasks = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("http://localhost:3000/api/tasks", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      if (!res.ok) {
        throw new Error("Failed to fetch tasks");
      }
      const userData = await res.json();
      setUserTasks(userData.data);
    } catch (error) {
      console.log("Error fetching tasks", error);
    } finally {
      setIsLoading(false);
    }
  };

  const addTask = async (newTask) => {
    const taskToSend = {
      ...newTask,
      status: newTask.status || "not_started",
    };
    try {
      const res = await fetch(`http://localhost:3000/api/tasks`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(taskToSend),
      });
      if (!res.ok) {
        throw new Error("Failed to POST API request");
      }
      const userData = await res.json();
      if (!userData) {
        throw new Error("Request failed");
      }
      const createdTask = userData.data;
      setUserTasks((prevTasks) => [...prevTasks, createdTask]);
      return createdTask;
    } catch (error) {
      console.log("Error posting task", error);
      throw error;
    }
  };

  const updateTask = async (taskData) => {
    try {
      const res = await fetch(
        `http://localhost:3000/api/tasks/${taskData._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(taskData),
        }
      );
      if (!res.ok) {
        throw new Error("Failed to PUT API request");
      }
      const userData = await res.json();
      if (!userData) {
        throw new Error("Request failed");
      }
      const updatedTask = userData.data;
      setUserTasks((prevTasks) =>
        prevTasks.map((task) =>
          task._id === updatedTask._id ? updatedTask : task
        )
      );
      return updatedTask;
    } catch (error) {
      console.log("PUT API error", error);
      throw error;
    }
  };

  const deleteTask = async (taskId) => {
    try {
      const res = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        }
      });
      if (!res.ok) {
        throw new Error('Failed DELETE API request')
      }
      setUserTasks(prevTasks => prevTasks.filter(task => task._id !== taskId));
    } catch (error) {
      console.log('Error deleting task', error);
      throw error;
    }
  };

  const value = {
    userTasks,
    isLoading,
    addTask,
    updateTask,
    deleteTask,
    refreshTasks: fetchTasks
  };

  return (
    <TaskContext.Provider value={value}>
      {children}
    </TaskContext.Provider>
  );
};
