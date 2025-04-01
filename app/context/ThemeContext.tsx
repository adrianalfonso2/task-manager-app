// ThemeContext.tsx
// This context manages the app's theme state and provides theme-related utilities
import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';

// Define the available theme types (light or dark)
type ThemeType = 'light' | 'dark';

// Define the shape of our theme context
interface ThemeContextType {
  theme: ThemeType;
  toggleTheme: () => void;
  colorScheme: ThemeType;
}

// Create the theme context with default values
const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  toggleTheme: () => {},
  colorScheme: 'light',
});

// Custom hook to access theme context - export with both names for compatibility
export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within a ThemeProvider');
  }
  return context;
};

// Export the same hook as useTheme for backward compatibility
export const useTheme = useAppTheme;

// Theme provider component that wraps the app
export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Get device color scheme using the hook at the top level
  const deviceColorScheme = useDeviceColorScheme();
  
  // Initialize theme with a simple default value
  const [theme, setTheme] = useState<ThemeType>('light');
  
  // Update theme based on device color scheme in useEffect
  useEffect(() => {
    setTheme(deviceColorScheme || 'light');
  }, [deviceColorScheme]);

  // Toggle between light and dark themes
  const toggleTheme = useCallback(() => {
    setTheme(current => current === 'light' ? 'dark' : 'light');
  }, []);

  // Provide theme context to children
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, colorScheme: theme }}>
      {children}
    </ThemeContext.Provider>
  );
}; 