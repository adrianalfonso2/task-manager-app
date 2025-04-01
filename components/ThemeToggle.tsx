// ThemeToggle.tsx
// A component that provides a button to toggle between light and dark themes
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAppTheme } from '@/app/context/ThemeContext';

// ThemeToggle component that displays a sun/moon icon based on current theme
export const ThemeToggle: React.FC = () => {
  // Get current theme and toggle function from context
  const { theme, toggleTheme } = useAppTheme();

  // Determine which icon to show based on current theme
  const icon = theme === 'light' ? 'moon' : 'sunny';

  return (
    <TouchableOpacity 
      onPress={toggleTheme}
      style={styles.button}
      accessibilityLabel={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <Ionicons name={icon} size={24} color={theme === 'light' ? '#000' : '#fff'} />
    </TouchableOpacity>
  );
};

// Styles for the theme toggle button
const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'transparent',
  },
}); 