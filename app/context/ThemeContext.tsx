import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme as useDeviceColorScheme } from 'react-native';

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  colorScheme: 'light' | 'dark';
  setTheme: (theme: ThemeType) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const deviceColorScheme = useDeviceColorScheme();
  // Initialize with the device's color scheme, or default to 'light'
  const [theme, setTheme] = useState<ThemeType>(deviceColorScheme === 'dark' ? 'dark' : 'light');
  
  // The colorScheme is now the same as the theme since we're not using 'system' anymore
  const colorScheme = theme;

  // Toggle simply between light and dark
  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  // Update theme when device color scheme changes (optional)
  useEffect(() => {
    // This could be enhanced to load from AsyncStorage for persistence
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, colorScheme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}; 