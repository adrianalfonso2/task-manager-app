// ThemedView.tsx
// A component that renders a View with theme-appropriate background color
import { View, type ViewProps } from 'react-native';

import { useThemeColor } from '@/hooks/useThemeColor';

/**
 * Props for ThemedView component
 * Extends standard ViewProps with theming options
 */
export type ThemedViewProps = ViewProps & {
  // Optional custom light mode background color
  lightColor?: string;
  // Optional custom dark mode background color
  darkColor?: string;
};

/**
 * View component that automatically uses theme colors for its background
 * Simplifies creating containers that adapt to the current theme
 */
export function ThemedView({ style, lightColor, darkColor, ...otherProps }: ThemedViewProps) {
  // Get the appropriate background color based on the current theme
  const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');

  // Return a View with the theme-appropriate background color
  return <View style={[{ backgroundColor }, style]} {...otherProps} />;
}
