import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '@/app/context/ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  // Show sun icon for dark mode (indicating you can switch to light)
  // and moon icon for light mode (indicating you can switch to dark)
  const icon = theme === 'light' 
    ? <Ionicons name="moon" size={24} color="#6e6e70" />
    : <Ionicons name="sunny" size={24} color="#f8cf46" />;

  // Get label text for accessibility
  const accessibilityLabel = theme === 'light'
    ? 'Light mode active. Tap to switch to dark mode.'
    : 'Dark mode active. Tap to switch to light mode.';

  return (
    <TouchableOpacity
      onPress={toggleTheme}
      style={styles.container}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
    >
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 8,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 