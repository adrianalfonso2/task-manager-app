import React, { createContext, useState, useContext } from 'react';
import { Task, Category, CategoryType, CATEGORY_COLORS, CATEGORY_ICONS } from '../types';

interface TaskContextType {
  tasks: Task[];
  categories: Category[];
  addTask: (title: string, description: string, category: string) => void;
  toggleComplete: (id: string) => void;
  deleteTask: (id: string) => void;
  getTasksByCategory: (categoryId: string) => Task[];
}

const TaskContext = createContext<TaskContextType | undefined>(undefined);

export const TaskProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [categories, setCategories] = useState<Category[]>([
    {
      id: '1',
      name: 'Work',
      color: CATEGORY_COLORS.Work,
      icon: CATEGORY_ICONS.Work
    },
    {
      id: '2',
      name: 'Personal',
      color: CATEGORY_COLORS.Personal,
      icon: CATEGORY_ICONS.Personal
    },
    {
      id: '3',
      name: 'School',
      color: CATEGORY_COLORS.School,
      icon: CATEGORY_ICONS.School
    },
    {
      id: '4',
      name: 'Other',
      color: CATEGORY_COLORS.Other,
      icon: CATEGORY_ICONS.Other
    }
  ]);

  const addTask = (title: string, description: string, category: string = '4') => {
    const newTask: Task = {
      id: Date.now().toString(),
      title,
      description,
      completed: false,
      category
    };
    setTasks((prevTasks) => [...prevTasks, newTask]);
  };

  const toggleComplete = (id: string) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
  };

  const getTasksByCategory = (categoryId: string) => {
    return tasks.filter(task => task.category === categoryId);
  };

  return (
    <TaskContext.Provider value={{ 
      tasks, 
      categories, 
      addTask, 
      toggleComplete, 
      deleteTask,
      getTasksByCategory
    }}>
      {children}
    </TaskContext.Provider>
  );
};

export const useTaskContext = () => {
  const context = useContext(TaskContext);
  if (context === undefined) {
    throw new Error('useTaskContext must be used within a TaskProvider');
  }
  return context;
}; 