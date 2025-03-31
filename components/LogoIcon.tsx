import React from 'react';
import { Image, StyleSheet } from 'react-native';

interface LogoIconProps {
  size?: number;
  color?: string; // Not used but included for compatibility with tab bar icon props
}

export const LogoIcon: React.FC<LogoIconProps> = ({ size = 28 }) => {
  return (
    <Image
      source={require('@/assets/images/task-manager-logo.png')}
      style={[styles.icon, { width: size, height: size }]}
      resizeMode="contain"
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    width: 28,
    height: 28,
  },
}); 