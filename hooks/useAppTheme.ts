import { StyleSheet } from 'react-native';
import { useTheme } from '@/app/context/ThemeContext';
import { Colors } from '@/constants/Colors';

// Expanded color palette
const extendedColors = {
  light: {
    ...Colors.light,
    primaryBackground: '#f8f9fa',
    secondaryBackground: '#ffffff',
    cardBackground: '#ffffff',
    borderColor: '#e1e4e8',
    primaryButtonBackground: '#007aff',
    primaryButtonText: '#ffffff',
    inputBackground: '#f1f3f5',
    headerBackground: '#ffffff',
    taskItemBackground: '#ffffff',
    statusBarStyle: 'dark' as 'dark' | 'light',
  },
  dark: {
    ...Colors.dark,
    primaryBackground: '#121212',
    secondaryBackground: '#1c1c1e',
    cardBackground: '#252525',
    borderColor: '#333333',
    primaryButtonBackground: '#0a84ff',
    primaryButtonText: '#ffffff',
    inputBackground: '#2c2c2e',
    headerBackground: '#1c1c1e',
    taskItemBackground: '#252525',
    statusBarStyle: 'light' as 'dark' | 'light',
  }
};

export function useAppTheme() {
  const { colorScheme } = useTheme();
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

  return { 
    theme, 
    styles, 
    colorScheme,
  };
} 