// useAppTheme.ts
// This hook provides themed styles and color values for the entire application
import { StyleSheet } from 'react-native';
import { useTheme as useContextTheme } from '@/app/context/ThemeContext';
import { Colors } from '@/constants/Colors';

// Expanded color palette that extends the basic Colors with more specific UI elements
const extendedColors = {
  light: {
    ...Colors.light,
    primaryBackground: '#f8f9fa',    // Main app background
    secondaryBackground: '#ffffff',   // Secondary areas background
    cardBackground: '#ffffff',        // Card component background
    borderColor: '#e1e4e8',           // Border color for containers
    primaryButtonBackground: '#007aff', // Primary action buttons
    primaryButtonText: '#ffffff',     // Text on primary buttons
    inputBackground: '#f1f3f5',       // Input field background
    headerBackground: '#ffffff',      // Header background
    taskItemBackground: '#ffffff',    // Task item background
    statusBarStyle: 'dark' as 'dark' | 'light', // Status bar style
  },
  dark: {
    ...Colors.dark,
    primaryBackground: '#121212',     // Dark mode main background
    secondaryBackground: '#1c1c1e',   // Dark mode secondary background
    cardBackground: '#252525',        // Dark mode card background
    borderColor: '#333333',           // Dark mode borders
    primaryButtonBackground: '#0a84ff', // Dark mode primary buttons
    primaryButtonText: '#ffffff',     // Dark mode button text
    inputBackground: '#2c2c2e',       // Dark mode input background
    headerBackground: '#1c1c1e',      // Dark mode header
    taskItemBackground: '#252525',    // Dark mode task items
    statusBarStyle: 'light' as 'dark' | 'light', // Dark mode status bar
  }
};

/**
 * Custom hook that provides theme colors and pre-built styles
 * 
 * @returns {object} Object containing theme colors, pre-built styles, and current color scheme
 */
export function useAppTheme() {
  // This grabs current color scheme from theme context
  const { theme: colorScheme } = useContextTheme();
  
  // This  theme colors based on current color scheme
  const theme = extendedColors[colorScheme];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.primaryBackground,
    },
    header: {
      padding: 16,
      paddingTop: 24,
      backgroundColor: theme.headerBackground,
      borderBottomWidth: 1,
      borderBottomColor: theme.borderColor,
    },
    card: {
      backgroundColor: theme.cardBackground,
      borderRadius: 12,
      padding: 16,
      marginVertical: 8,
      marginHorizontal: 16,
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    textInput: {
      height: 44,
      backgroundColor: theme.inputBackground,
      borderRadius: 10,
      paddingHorizontal: 16,
      color: theme.text,
      borderWidth: 1,
      borderColor: theme.borderColor,
    },
    taskItem: {
      backgroundColor: theme.taskItemBackground,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderBottomColor: theme.borderColor,
    },
    text: {
      color: theme.text,
    },
    subtitle: {
      color: theme.text,
      opacity: 0.7,
    },
  });

  // This returns the theme colors, styles, and current color scheme
  return { 
    theme, 
    styles, 
    colorScheme,
  };
} 