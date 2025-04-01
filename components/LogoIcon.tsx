// LogoIcon.tsx
// A component that renders the app's logo image with customizable size
import React from 'react';
import { Image, StyleSheet } from 'react-native';

/**
 * Props for the LogoIcon component
 */
interface LogoIconProps {
  // Size of the logo in pixels (default: 28)
  size?: number;
  // Color prop included for compatibility with tab bar icon requirements
  // Not actually used since this is an image-based icon
  color?: string;
}

/**
 * Renders the task manager logo as an image
 * Used in headers and navigation elements
 */
export const LogoIcon: React.FC<LogoIconProps> = ({ size = 28 }) => {
  return (
    <Image
      source={require('@/assets/images/task-manager-logo.png')}
      style={[styles.icon, { width: size, height: size }]}
      resizeMode="contain"
    />
  );
};

// Styles for the logo icon
const styles = StyleSheet.create({
  icon: {
    width: 28,
    height: 28,
  },
}); 